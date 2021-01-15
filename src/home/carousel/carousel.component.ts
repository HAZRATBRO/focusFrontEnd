import {
  Component,
  Input,
  OnDestroy,
  TemplateRef,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  KeyValueDiffer,
  KeyValueDiffers
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  
} from "@angular/animations";
  

export enum Direction {
  Next,
  Prev
}

export enum Animation {
  Fade = "fade",
  Slide = "slide"
}

export interface ActiveSlides {
  previous: number;
  current: number;
  next: number;
}

@Component({
  selector: "app-carousel",
  templateUrl: `carousel.component.html`,
  styleUrls: ["./carousel.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("slideState", [
      state(
        "current",
        style({
          transform: "translateX(0%)",
          zIndex: 1
        })
      ),
      state(
        "next",
        style({
          transform: "translateX(100%)",
          zIndex: 1
        })
      ),
      state(
        "previous",
        style({
          transform: "translateX(-100%)",
          zIndex: 1
        })
      ),
      transition("current => previous", animate("400ms ease-in")),
      transition("next => current", animate("400ms ease-in"))
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
 
  options1:any;
  options2:any;
  products:any =[];
  @Input()
  slides: any[];
  @Input()
  isNavigationVisible = false;
  @Input()
  isThumbnailsVisible = false;
  @Input()
  animation: any = Animation.Fade;
  @Input()
  autoPlayDuration = 0;
  @Input()
  slideTemplateRef: TemplateRef<any>;
  @Input()
  thumbnailTemplateRef: TemplateRef<any>;
  currentInterval: any;
  differ: KeyValueDiffer<ActiveSlides, any>;

  private _direction: Direction = Direction.Next;
  get direction() {
    return this._direction;
  }
  set direction(direction: Direction) {
    this._direction = direction;
  }

  private _activeSlides: ActiveSlides;
  get activeSlides() {
    return this._activeSlides;
  }
  set activeSlides(activeSlides: ActiveSlides) {
    this._activeSlides = activeSlides;
  }
  

  constructor(
    private cd: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) {
    this.products.push( {
      title: '',
       image: `../../assets/carousel_2.jpg`,
    },
    {
      title:'',
      image: `../../assets/carousel_3.jpg`
    }
  ) 
    this.options1 = {
      animation: {
        animationClass: 'transition',
        animationTime: 1000,
      },
      swipe: {
        swipeable: true,
        swipeVelocity: .004,
      },
      drag: {
        draggable: true,
        dragMany: true,
      },
      arrows: true,
      infinite: true,
      autoplay: {
        enabled: true,
        direction: 'right',
        delay: 3000,
        stopOnHover: true,
        speed: 9000,
      },
      breakpoints: [
        {
          width: 768,
          number: 1,
        },
        {
          width: 991,
          number: 1,
        },
        {
          width: 9999,
          number: 1,
        },
      ],
    }
  }

  ngOnInit(): void {
    if (this.slides) {
      this.activeSlides = this.getPreviousCurrentNextIndexes(0);
      this.differ = this.differs.find(this.activeSlides).create();
      if (this.slides.length > 1 && this.autoPlayDuration > 0) {
        this.startTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.resetTimer();
    this.cd.detach();
  }

  select(index: number): void {
    this.resetTimer();
    this.activeSlides = this.getPreviousCurrentNextIndexes(index);
    this.direction = this.getDirection(this.activeSlides.current, index);
    this.startTimer();

    if (this.differ.diff(this.activeSlides)) {
      this.cd.detectChanges();
    }
  }

  getDirection(oldIndex: number, newIndex: number): Direction {
    const images = this.slides;

    if (oldIndex === images.length - 1 && newIndex === 0) {
      return Direction.Next;
    } else if (oldIndex === 0 && newIndex === images.length - 1) {
      return Direction.Prev;
    }

    return oldIndex < newIndex ? Direction.Next : Direction.Prev;
  }

  getPreviousCurrentNextIndexes(index: number): ActiveSlides {
    const images = this.slides;

    return {
      previous: (index === 0 ? images.length - 1 : index - 1) % images.length,
      current: index % images.length,
      next: (index === images.length - 1 ? 0 : index + 1) % images.length
    };
  }

  getAnimationSlideState(index: number) {
    return index === this.activeSlides.current
      ? "current"
      : index === this.activeSlides.next
      ? "next"
      : index === this.activeSlides.previous
      ? "previous"
      : "";
  }

  startTimer(): void {
    this.resetTimer();

    if (this.autoPlayDuration > 0) {
      this.currentInterval = setInterval(
        () => this.select(this.activeSlides.next),
        this.autoPlayDuration
      );
    }
  }

  resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }
             
   
}
