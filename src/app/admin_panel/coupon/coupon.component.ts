import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { CartService } from '../../_service/cart.service';
import { CouponService } from '../../_service/coupon.service';
import { Coupon } from '../../../model/coupon.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-coupon',
  imports: [
    AdminHeaderComponent,
    ReactiveFormsModule,
    Toast,
    DatePickerModule,
    NgFor
  ],
  providers:[DatePipe],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss'
})
export class CouponComponent implements OnInit{
  couponForm!: FormGroup;
  couponList:Coupon[]=[];
  coupon!: Coupon;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private datePipe: DatePipe
  ){}
  ngOnInit(): void {
    this.initializeForm();
    this.couponService.getAllCoupons().subscribe((response)=>{
      this.couponList = response;
      this.couponList.forEach(coupon => {
        if (coupon.validFrom) {
          coupon.validFrom = this.datePipe.transform(coupon.validFrom, 'dd-MM-yyyy') as string;
        }
        if (coupon.validTill) {
          coupon.validTill = this.datePipe.transform(coupon.validTill, 'dd-MM-yyyy') as string;
        }
      });
      
    })
  }

  initializeForm(){
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      discountAmount: [null, Validators.required],
      discountType: ['Amount', Validators.required],
      validFrom: ['', Validators.required],
      validTill: ['', Validators.required],
      isActive: ['YES', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.couponForm.valid) {
      
      const couponData = {
        code: this.couponForm.value.code,
        discountAmount: this.couponForm.value.discountAmount,
        discountType: this.couponForm.value.discountType === 'Amount' ? 'AMOUNT' : 'PERCENTAGE',
        validFrom: this.datePipe.transform(this.couponForm.value.validFrom, 'yyyy-MM-ddTHH:mm:ss') as string,
        validTill: this.datePipe.transform(this.couponForm.value.validTill, 'yyyy-MM-ddTHH:mm:ss') as string,
        isActive: this.couponForm.value.isActive === 'YES' ? true : false
      };
      this.couponService.addNewCoupon(couponData).subscribe((response) => {
        console.log(response);
        
      });
    }
  }
  
  onReset(): void {
    this.couponForm.reset();
  }
}
