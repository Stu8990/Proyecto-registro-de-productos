import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoProductoService } from '../../services/tipo-producto.service';
import { TipoProducto } from '../../models/tipo-producto.model';

@Component({
  selector: 'app-tipo-producto-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-producto-list.html',
  styleUrl: './tipo-producto-list.css',
})
export class TipoProductoList implements OnInit {
  tiposProducto: TipoProducto[] = [];
  tipoProductoSeleccionado: TipoProducto | null = null;
  nuevoTipoProducto: TipoProducto = { Id: 0, Tipo: '' };
  modoEdicion: boolean = false;

  constructor(private tipoProductoService: TipoProductoService) {}

  ngOnInit(): void {
    this.cargarTiposProducto();
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.listarTiposProducto().subscribe({
      next: (data) => {
        this.tiposProducto = data;
      },
      error: (error) => {
        console.error('Error al cargar tipos de producto:', error);
        alert('Error al cargar tipos de producto');
      }
    });
  }

  agregarTipoProducto(): void {
    if (!this.nuevoTipoProducto.Tipo.trim()) {
      alert('Por favor ingrese un tipo');
      return;
    }

    // Generar ID aleatorio si no existe
    if (this.nuevoTipoProducto.Id === 0) {
      this.nuevoTipoProducto.Id = Math.floor(Math.random() * 10000) + 1;
    }

    this.tipoProductoService.insertarTipoProducto(this.nuevoTipoProducto).subscribe({
      next: () => {
        alert('Tipo de producto agregado exitosamente');
        this.nuevoTipoProducto = { Id: 0, Tipo: '' };
        this.cargarTiposProducto();
      },
      error: (error) => {
        console.error('Error al agregar tipo de producto:', error);
        alert('Error al agregar tipo de producto');
      }
    });
  }

  seleccionarParaEditar(tipo: TipoProducto): void {
    this.tipoProductoSeleccionado = { ...tipo };
    this.modoEdicion = true;
  }

  actualizarTipoProducto(): void {
    if (!this.tipoProductoSeleccionado || !this.tipoProductoSeleccionado.Tipo.trim()) {
      alert('Por favor ingrese un tipo válido');
      return;
    }

    this.tipoProductoService.actualizarTipoProducto(this.tipoProductoSeleccionado).subscribe({
      next: () => {
        alert('Tipo de producto actualizado exitosamente');
        this.cancelarEdicion();
        this.cargarTiposProducto();
      },
      error: (error) => {
        console.error('Error al actualizar tipo de producto:', error);
        alert('Error al actualizar tipo de producto');
      }
    });
  }

  eliminarTipoProducto(id: number): void {
    if (!confirm('¿Está seguro de eliminar este tipo de producto?')) {
      return;
    }

    this.tipoProductoService.eliminarTipoProducto(id).subscribe({
      next: () => {
        alert('Tipo de producto eliminado exitosamente');
        this.cargarTiposProducto();
      },
      error: (error) => {
        console.error('Error al eliminar tipo de producto:', error);
        alert('Error al eliminar tipo de producto');
      }
    });
  }

  cancelarEdicion(): void {
    this.tipoProductoSeleccionado = null;
    this.modoEdicion = false;
  }
}
