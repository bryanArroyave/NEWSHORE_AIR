import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  @Output() sendData: EventEmitter<string> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
    public readonly formService: FormService,
    private readonly alertService: AlertService
  ) {
    this.form = this.fb.group({});
    this.buildForm();
  }

  private buildForm() {
    this.form.addControl('origin', new FormControl('MZL', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]));
    this.form.addControl('destination', new FormControl('BOG', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]));
    this.form.addControl('cant', new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]));
  }

  async proccess() {
    const origin = this.form.get('origin').value;
    const destination = this.form.get('destination').value;

    if (origin?.toUpperCase() === destination.toUpperCase()) {
      await this.alertService.warning('Advertencia', 'El origin no puede ser igual al destino');
    } else {
      this.sendData.emit(this.form.value);
    }
  }
  ngOnInit(): void {
  }
}
