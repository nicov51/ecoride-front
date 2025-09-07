import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ReviewCardData} from "../../../../core/models/employee.interface";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    FormsModule
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review!: ReviewCardData;
  @Output() approve = new EventEmitter<number>();
  @Output() reject = new EventEmitter<{id: number, reason: string}>();
  @Output() delete = new EventEmitter<number>();

  showRejectForm = signal(false);
  rejectReason = signal('');
  loading = signal(false);

  getRatingStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  onApprove() {
    this.loading.set(true);
    this.approve.emit(this.review.id);
  }

  onReject() {
    this.showRejectForm.set(true);
  }

  confirmReject() {
    if (this.rejectReason().trim()) {
      this.loading.set(true);
      this.reject.emit({
        id: this.review.id,
        reason: this.rejectReason()
      });
      this.showRejectForm.set(false);
      this.rejectReason.set('');
    }
  }

  cancelReject() {
    this.showRejectForm.set(false);
    this.rejectReason.set('');
  }

  onDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.loading.set(true);
      this.delete.emit(this.review.id);
    }
  }

  getStatusClass(): string {
    switch (this.review.status) {
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      default: return 'status-pending';
    }
  }

  getStatusText(): string {
    switch (this.review.status) {
      case 'APPROVED': return '✅ Approuvé';
      case 'REJECTED': return '❌ Rejeté';
      default: return '⏳ En attente';
    }
  }
}
