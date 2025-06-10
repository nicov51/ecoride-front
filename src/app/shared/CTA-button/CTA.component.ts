import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-CTA-button',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    NgClass,
    MatIcon
  ],
  templateUrl: './CTA.component.html',
  styleUrl: './CTA.component.css'
})
export class CTAComponent {
  @Input() text: string = 'Valider';
  @Input() icon: string | undefined;
  @Input() color:  'primary' | 'accent' | 'warn' | 'neutral' = 'primary';
  @Input() state: 'enabled' | 'hovered' | 'disabled' = 'enabled';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' = 'button';

}
