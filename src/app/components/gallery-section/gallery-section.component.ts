import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GALLERY_LIST, GalleryItem } from '../../constants/gallery-list';
import { CarouselComponent } from '../carousel/carousel.component';
import { ModalComponent } from '../modal/modal.component';
import { TitleSectionComponent } from '../title-section/title-section.component';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [
    CommonModule,
    TitleSectionComponent,
    ModalComponent,
    CarouselComponent,
  ],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
})
export class GallerySectionComponent {
  galleryList = GALLERY_LIST;
  private selectedGallerySubject = new BehaviorSubject<GalleryItem | undefined>(
    undefined
  );
  selectedGallery$ = this.selectedGallerySubject.asObservable();
  @ViewChild('modal') modal!: ModalComponent;

  onOpenModal(galleryID: string): void {
    const selectedGallery = this.galleryList.find(
      (item) => item.id === galleryID
    );
    if (selectedGallery === undefined) return;
    this.selectedGallerySubject.next(selectedGallery);
    this.modal.onToggleModal();
  }
}
