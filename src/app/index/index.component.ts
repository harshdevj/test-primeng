import {
    Component, OnInit, ViewEncapsulation,
    HostBinding, HostListener, AfterViewInit,
    ElementRef, ViewChild, Renderer, AfterViewChecked 
} from '@angular/core';
import { IndexService } from './index.service';

@Component({
    selector: 'index',
    templateUrl: './index.template.html',
    styleUrls: ['./index.scss']
    //encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit, AfterViewInit, AfterViewChecked  {

    followers = [];

    @HostBinding('style.height.px')
    height: number;

    @HostListener('window:resize', ['$event'])
    setHeight() {
        this.height = window.innerHeight;
        this.renderer.setElementStyle(
            this.elementRef.nativeElement.querySelector('.ui-datatable-scrollable-body'),
            'height', (window.innerHeight - 65) + 'px');
    }

    @ViewChild('selector') private someName;
    @ViewChild('myTable') private myTable;

    staticData: any = {
        branch: ['01', '02', '03'],
        productBranch: {
            '01': ['aaa', 'bbb', 'ccc'],
            '02': ['ddd', 'eee', 'fff'],
            '03': ['ggg', 'hhh' ]
        },
        source: {
            'aaa': ['111', '222', '333'],
            'eee': ['444', '555', '666'],
            'hhh': ['777', '888', '999']
        }
    };
    formData: any = {
        br: '',
        product: '',
        source: ''
    };

    constructor(private service: IndexService, protected elementRef: ElementRef, private renderer: Renderer) {
        console.info(this.height);
    }

    ngOnInit() {
        this.service.getData()
            .subscribe(resp => {
                console.info(resp.json());
                this.followers = resp.json();
            }, err => {
                console.error(err.json());
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            console.info(window.document.querySelector('.ui-datatable-scrollable-body'));
            console.info(this.someName.nativeElement.clientHeight);
            //this.elementRef.nativeElement.querySelector('.ui-datatable-scrollable-body').style.height = (this.someName.nativeElement.clientHeight - 70) + 'px';
            //this.renderer.setElementStyle(this.elementRef.nativeElement.querySelector('.ui-datatable-scrollable-body'), 'height', (this.someName.nativeElement.clientHeight - 80) + 'px');
            //$('.ui-datatable-scrollable-body').style.height = (this.someName.nativeElement.clientHeight - 80) + 'px';
        }, 50);
    }

    ngAfterViewChecked() {
        //console.info(22222222, this.someName.nativeElement.clientHeight);
    }

    onBrChange($event) {
        this.formData.product = this.staticData.productBranch[$event][0];
        /*if (this.staticData.source[this.formData.product]) {
            this.formData.source = this.staticData.source[this.formData.product][0];
    }*/
    }

    onProdChange($event) {
        if (this.staticData.source[this.formData.product]) {
            this.formData.source = this.staticData.source[this.formData.product][0];
        }
    }

}