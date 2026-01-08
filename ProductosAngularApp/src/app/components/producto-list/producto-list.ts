import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { TipoProductoService } from '../../services/tipo-producto.service';
import { Producto } from '../../models/producto.model';
import { TipoProducto } from '../../models/tipo-producto.model';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
export class ProductoList implements OnInit {
  productos: Producto[] = [];
  tiposProducto: TipoProducto[] = [];
  productoSeleccionado: Producto | null = null;
  nuevoProducto: Producto = { Id: 0, IdTipo: 0, Descripcion: '', Valor: 0, Costo: 0 };
  modoEdicion: boolean = false;

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    this.cargarTiposProducto();
    this.cargarProductos();
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.listarTiposProducto().subscribe({
      next: (data) => {
        this.tiposProducto = data;
      },
      error: (error) => {
        console.error('Error al cargar tipos de producto:', error);
      }
    });
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar productos');
      }
    });
  }

  agregarProducto(): void {
    if (!this.nuevoProducto.Descripcion.trim() || this.nuevoProducto.IdTipo === 0) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.productoService.insertarProducto(this.nuevoProducto).subscribe({
      next: () => {
        alert('Producto agregado exitosamente');
        this.nuevoProducto = { Id: 0, IdTipo: 0, Descripcion: '', Valor: 0, Costo: 0 };
        this.cargarProductos();
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar producto');
      }
    });
  }

  seleccionarParaEditar(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
    this.modoEdicion = true;
  }

  actualizarProducto(): void {
    if (!this.productoSeleccionado || !this.productoSeleccionado.Descripcion.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.productoService.actualizarProducto(this.productoSeleccionado).subscribe({
      next: () => {
        alert('Producto actualizado exitosamente');
        this.cancelarEdicion();
        this.cargarProductos();
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
        alert('Error al actualizar producto');
      }
    });
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado exitosamente');
        this.cargarProductos();
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto');
      }
    });
  }

  cancelarEdicion(): void {
    this.productoSeleccionado = null;
    this.modoEdicion = false;
  }

  obtenerNombreTipo(idTipo: number): string {
    const tipo = this.tiposProducto.find(t => t.Id === idTipo);
    return tipo ? tipo.Tipo : 'N/A';
  }
}
