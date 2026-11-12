import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  MapPin,
  Cpu,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Maximize2,
  Wifi,
  Car,
  Coffee,
  Presentation,
  ConciergeBell,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Compass,
  Lock
} from 'lucide-react';

/**
 * ATRIUM BUSINESS CENTER — Commercial Real Estate Homepage (Almaty)
 * Single-file React application with Tailwind CSS and custom architectural styling.
 */

// Verified high-resolution Unsplash architectural & commercial interior photographs
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=85',
  about: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  spaces: {
    lobby: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1400&q=85',
    offices: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    conference: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=85',
    coworking: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1400&q=85',
    meeting: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1400&q=85',
    lounge: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1400&q=85',
  },
  offices: {
    private: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=85',
    openSpace: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=85',
    corporate: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
  },
  coworkingFeature: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
};

// Navigation items
const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'О бизнес-центре', href: '#about' },
  { label: 'Офисы', href: '#offices' },
  { label: 'Коворкинг', href: '#coworking' },
  { label: 'Инфраструктура', href: '#infrastructure' },
  { label: 'Контакты', href: '#contacts' },
];

// Statistics data
const STATS = [
  { id: 'area', value: 22000, suffix: ' м²', formatSpaces: true, label: 'Общая площадь', sub: 'Архитектурный комплекс класса А+' },
  { id: 'floors', value: 18, suffix: '', formatSpaces: false, label: 'Этажей', sub: 'Панорамное остекление с видом на горы' },
  { id: 'parking', value: 120, suffix: '', formatSpaces: false, label: 'Парковочных мест', sub: 'Двухуровневый подземный паркинг' },
  { id: 'service', value: 24, suffix: '/7', formatSpaces: false, label: 'Круглосуточный сервис', sub: 'Охрана, диспетчеризация и консьерж' },
];

// Spaces data for Section 5 (Asymmetrical Editorial Gallery)
const SPACES_DATA = [
  {
    id: 'lobby',
    title: 'Просторное лобби',
    shortDesc: 'Двусветный атриум с натуральным камнем, латунными акцентами и зоной приветствия.',
    fullDesc:
      'Центральное лобби ATRIUM BUSINESS CENTER спроектировано как архитектурная визитная карточка резидентов. Высота потолков 7,5 метров, отделка травертином, интеллектуальная система навигации и профессиональная служба ресепшн создают безупречное первое впечатление для партнёров и гостей.',
    specs: ['Высота потолков 7.5 м', 'Турникеты с FaceID / NFC', 'Лобби-бар и зона ожидания'],
    image: IMAGES.spaces.lobby,
    formType: 'Корпоративное пространство',
    gridClass: 'lg:col-span-7 lg:row-span-2 min-h-[420px] lg:min-h-[560px]',
  },
  {
    id: 'offices',
    title: 'Офисные помещения',
    shortDesc: 'Гибкие планировки с панорамным остеклением и естественным освещением.',
    fullDesc:
      'Офисные этажи с шагом колонн 8,4 метра позволяют реализовать любую планировочную концепцию — от кабинетной системы до динамичного open space. Инженерные системы обеспечивают индивидуальный климат-контроль и приточно-вытяжную вентиляцию с многоступенчатой фильтрацией.',
    specs: ['Высота потолков 3.6 м', 'Энергоэффективные стеклопакеты', 'Фальшпол и скрытые коммуникации'],
    image: IMAGES.spaces.offices,
    formType: 'Приватный офис',
    gridClass: 'lg:col-span-5 min-h-[268px]',
  },
  {
    id: 'conference',
    title: 'Конференц-залы',
    shortDesc: 'Трансформируемые залы для форумов, презентаций и корпоративных мероприятий.',
    fullDesc:
      'Современный конференц-центр на втором этаже включает модульные залы вместимостью до 140 человек. Пространства оснащены LED-экранами высокого разрешения, системами синхронного перевода, акустическими панелями и выделенной зоной кейтеринга.',
    specs: ['Вместимость до 140 гостей', '4K проекция и конгресс-система', 'Выделенная зона кофе-брейков'],
    image: IMAGES.spaces.conference,
    formType: 'Конференц-зал / Переговорная',
    gridClass: 'lg:col-span-5 min-h-[268px]',
  },
  {
    id: 'coworking',
    title: 'Коворкинг',
    shortDesc: 'Дизайнерская рабочая среда для проектных команд, стартапов и резидентов.',
    fullDesc:
      'Пространство гибких форматов с эргономичной мебелью, акустическими телефонными будами, выделенными зонами фокусировки и комьюнити-менеджментом. Резиденты получают круглосуточный доступ ко всей инфраструктуре бизнес-центра.',
    specs: ['Фиксированные и гибкие места', 'Акустические Skype-кабины', 'Бесплатный specialty-кофе'],
    image: IMAGES.spaces.coworking,
    formType: 'Коворкинг',
    gridClass: 'lg:col-span-4 min-h-[300px]',
  },
  {
    id: 'meeting',
    title: 'Переговорные комнаты',
    shortDesc: 'Приватные переговорные с повышенной звукоизоляцией и ВКС-оборудованием.',
    fullDesc:
      'Переговорные комнаты на 6–18 персон с повышенным индексом звукоизоляции (Rw 52 дБ), беспроводным выводом изображения, системами видеоконференцсвязи и интеллектуальным бронированием через мобильное приложение резидента.',
    specs: ['От 6 до 18 участников', 'Звукоизоляция класса А', 'Интегрированные ВКС-терминалы'],
    image: IMAGES.spaces.meeting,
    formType: 'Конференц-зал / Переговорная',
    gridClass: 'lg:col-span-4 min-h-[300px]',
  },
  {
    id: 'lounge',
    title: 'Зоны отдыха',
    shortDesc: 'Приватные лаунж-террасы и пространства для неформального общения.',
    fullDesc:
      'Спокойные архитектурные лаунж-зоны с мягким сценарным освещением, живым озеленением и панорамным видом на Заилийский Алатау позволяют переключиться между задачами и провести неформальную встречу в комфортной атмосфере.',
    specs: ['Видовые панорамные зоны', 'Биофильный дизайн и озеленение', 'Акустический комфорт'],
    image: IMAGES.spaces.lounge,
    formType: 'Коворкинг',
    gridClass: 'lg:col-span-4 min-h-[300px]',
  },
];

// Office rental offers for Section 6
const OFFICE_OFFERS = [
  {
    id: 'private-office',
    category: 'private',
    badge: 'Приватные офисы',
    title: 'Представительский приватный офис',
    description:
      'Готовые к работе изолированные офисные блоки с кабинетной планировкой, собственной переговорной и панорамными окнами.',
    area: '45 – 85 м²',
    workstations: '6 – 12 рабочих мест',
    floor: '4 – 10 этажи',
    finish: 'Чистовая отделка / Shell & Core',
    formValue: 'Приватный офис',
    image: IMAGES.offices.private,
  },
  {
    id: 'open-space',
    category: 'openspace',
    badge: 'Open Space',
    title: 'Открытое пространство для команд',
    description:
      'Светлые офисные блоки свободной планировки с эффективной геометрией этажа, зонами коллаборации и выделенной мини-кухней.',
    area: '180 – 320 м²',
    workstations: '25 – 45 рабочих мест',
    floor: '8 – 14 этажи',
    finish: 'Гибкая адаптация под брендбук',
    formValue: 'Open Space',
    image: IMAGES.offices.openSpace,
  },
  {
    id: 'corporate-suite',
    category: 'corporate',
    badge: 'Корпоративные пространства',
    title: 'Корпоративный этаж или крупный блок',
    description:
      'Масштабные резиденции для штаб-квартир, финансовых организаций и международных компаний с приватным лифтовым холлом.',
    area: '650 – 1 200 м²',
    workstations: '80 – 150 рабочих мест',
    floor: '15 – 18 этажи',
    finish: 'Индивидуальный архитектурный проект',
    formValue: 'Корпоративное пространство',
    image: IMAGES.offices.corporate,
  },
];

// Infrastructure features for Section 8
const INFRASTRUCTURE_ITEMS = [
  {
    icon: Presentation,
    title: 'Конференц-залы',
    desc: 'Модульные залы с мультимедийным оснащением для деловых форумов, презентаций и стратегических сессий.',
  },
  {
    icon: Users,
    title: 'Переговорные комнаты',
    desc: 'Приватные комнаты различной вместимости с повышенной звукоизоляцией и системами видеоконференций.',
  },
  {
    icon: Car,
    title: 'Подземный паркинг',
    desc: 'Отапливаемый двухуровневый паркинг с распознаванием номеров, зарядками для электромобилей и лифтовым доступом.',
  },
  {
    icon: ShieldCheck,
    title: 'Круглосуточная охрана 24/7',
    desc: 'Многоуровневая система контроля доступа, интеллектуальное видеонаблюдение и профессиональная служба безопасности.',
  },
  {
    icon: Wifi,
    title: 'Высокоскоростной интернет',
    desc: 'Резервированные оптоволоконные каналы от нескольких независимых провайдеров с гарантированной отказоустойчивостью.',
  },
  {
    icon: ConciergeBell,
    title: 'Ресепшн и консьерж-сервис',
    desc: 'Встреча гостей, навигация, корреспонденция, бронирование переговорных и повседневная административная поддержка.',
  },
];

// Fictional tenants/partners for Section 9
const PARTNERS = [
  {
    name: 'KAZAERO CAPITAL',
    sector: 'Инвестиционный холдинг',
    svg: (
      <svg viewBox="0 0 200 48" className="h-9 w-auto" fill="none">
        <path d="M12 36L24 12L36 36H29L24 25L19 36H12Z" stroke="currentColor" strokeWidth="1.8" />
        <line x1="16" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <text x="46" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.2">KAZAERO</text>
        <text x="46" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3.4" opacity="0.7">CAPITAL</text>
      </svg>
    ),
  },
  {
    name: 'ALATAU VENTURES',
    sector: 'Венчурный фонд',
    svg: (
      <svg viewBox="0 0 210 48" className="h-9 w-auto" fill="none">
        <polygon points="24,10 38,36 10,36" stroke="currentColor" strokeWidth="1.7" />
        <polygon points="24,18 32,36 16,36" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <text x="48" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.4">ALATAU</text>
        <text x="48" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3">VENTURES</text>
      </svg>
    ),
  },
  {
    name: 'NORDIC TECH ASIA',
    sector: 'Разработка ПО',
    svg: (
      <svg viewBox="0 0 200 48" className="h-9 w-auto" fill="none">
        <rect x="12" y="13" width="22" height="22" stroke="currentColor" strokeWidth="1.7" />
        <line x1="12" y1="13" x2="34" y2="35" stroke="currentColor" strokeWidth="1.5" />
        <text x="44" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.4">NORDIC</text>
        <text x="44" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3.2" opacity="0.7">TECH ASIA</text>
      </svg>
    ),
  },
  {
    name: 'VERITAS LEGAL',
    sector: 'Международное право',
    svg: (
      <svg viewBox="0 0 200 48" className="h-9 w-auto" fill="none">
        <path d="M12 14L23 35L34 14" stroke="currentColor" strokeWidth="1.8" />
        <line x1="17" y1="14" x2="29" y2="14" stroke="currentColor" strokeWidth="1.4" />
        <text x="44" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.6">VERITAS</text>
        <text x="44" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3.4" opacity="0.7">LEGAL GROUP</text>
      </svg>
    ),
  },
  {
    name: 'SILKWAY GLOBAL',
    sector: 'Логистика и консалтинг',
    svg: (
      <svg viewBox="0 0 205 48" className="h-9 w-auto" fill="none">
        <circle cx="23" cy="24" r="11" stroke="currentColor" strokeWidth="1.7" />
        <ellipse cx="23" cy="24" rx="5" ry="11" stroke="currentColor" strokeWidth="1.3" />
        <line x1="12" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="1.3" />
        <text x="44" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.3">SILKWAY</text>
        <text x="44" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3.1" opacity="0.7">ADVISORY</text>
      </svg>
    ),
  },
  {
    name: 'QAZAQ FINTECH',
    sector: 'Финансовые технологии',
    svg: (
      <svg viewBox="0 0 205 48" className="h-9 w-auto" fill="none">
        <rect x="13" y="14" width="9" height="20" stroke="currentColor" strokeWidth="1.6" />
        <rect x="25" y="14" width="9" height="20" stroke="currentColor" strokeWidth="1.6" />
        <text x="44" y="24" fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2.2">QAZAQ</text>
        <text x="44" y="36" fill="currentColor" fontSize="8.5" fontWeight="400" letterSpacing="3.1" opacity="0.7">FINTECH LAB</text>
      </svg>
    ),
  },
];

// Sample demonstration testimonials for Section 10
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Переезд нашей региональной штаб-квартиры в ATRIUM BUSINESS CENTER позволил объединить 90 сотрудников на одном этаже с продуманной акустикой и панорамным видом на город. Отдельно отмечаем безупречную работу инженерной службы и ресепшн.',
    author: 'Арман Садыков',
    role: 'Управляющий директор',
    company: 'Kazaero Capital (демонстрационный профиль)',
    area: 'Корпоративный блок 720 м²',
  },
  {
    id: 2,
    quote:
      'Для международной технологической команды критически важны отказоустойчивая IT-инфраструктура, круглосуточный доступ и комфортные переговорные для звонков с европейскими офисами. В ATRIUM все эти стандарты реализованы на уровне лучших бизнес-центров.',
    author: 'Елена Ким',
    role: 'Операционный директор',
    company: 'Nordic Tech Asia (демонстрационный профиль)',
    area: 'Open Space 280 м²',
  },
  {
    id: 3,
    quote:
      'Мы начинали с шести резидентских мест в коворкинге ATRIUM, а через восемь месяцев масштабировались в собственный приватный офис в этом же здании без потери привычного ритма и сервисов.',
    author: 'Тимур Жумабаев',
    role: 'Управляющий партнёр',
    company: 'Veritas Legal Group (демонстрационный профиль)',
    area: 'Приватный офис 85 м²',
  },
];

/**
 * Custom Architectural Logo Component
 */
const AtriumLogo = ({ light = false, compact = false }) => (
  <div className="inline-flex items-center gap-3.5 select-none group">
    <div
      className={`relative flex items-center justify-center border transition-all duration-300 ${
        compact ? 'w-9 h-9' : 'w-10 h-10'
      } ${
        light
          ? 'border-[#C5A46D]/70 bg-white/5 text-[#C5A46D]'
          : 'border-[#0E1726]/20 bg-[#0E1726] text-[#C5A46D]'
      }`}
    >
      {/* Minimalist Architectural Monogram SVG */}
      <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
        <path d="M16 4L27 27H23.2L16 11.8L8.8 27H5L16 4Z" fill="currentColor" />
        <line x1="10.5" y1="21.5" x2="21.5" y2="21.5" stroke="currentColor" strokeWidth="1.6" />
        <line x1="16" y1="4" x2="16" y2="27" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.45" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span
        className={`font-serif tracking-[0.22em] font-semibold leading-none transition-all duration-300 ${
          compact ? 'text-lg' : 'text-xl'
        } ${light ? 'text-white' : 'text-[#0E1726]'}`}
      >
        ATRIUM
      </span>
      <span
        className={`text-[9px] tracking-[0.32em] uppercase mt-1 font-medium ${
          light ? 'text-[#C5A46D]' : 'text-[#646A73]'
        }`}
      >
        BUSINESS CENTER
      </span>
    </div>
  </div>
);

/**
 * Animated Counter Component using IntersectionObserver
 */
const AnimatedCounter = ({ target, suffix = '', formatSpaces = false, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp = null;
    const duration = 1800;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [trigger, target]);

  const formatted = formatSpaces
    ? count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : count.toString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
};

/**
 * Scroll Reveal Wrapper Component
 */
const RevealSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  // Header scroll & mobile drawer state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hero entrance animation trigger
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Statistics viewport trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Spaces modal (lightbox) state
  const [selectedSpace, setSelectedSpace] = useState(null);

  // Office filter state
  const [activeOfficeFilter, setActiveOfficeFilter] = useState('all');

  // Testimonial slider state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Interactive Location Pin Info state
  const [selectedMapPoint, setSelectedMapPoint] = useState('atrium');

  // Privacy Policy Modal state
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Contact Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    spaceType: 'Приватный офис',
    comment: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Trigger hero entrance on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for sticky compact header and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 48);
      setShowBackToTop(y > 650);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for statistics counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedSpace(null);
        setPrivacyModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (href, preselectedSpaceType = null) => {
    setMobileMenuOpen(false);
    if (preselectedSpaceType) {
      setFormData((prev) => ({ ...prev, spaceType: preselectedSpaceType }));
      setSubmitSuccess(false);
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filtered offices
  const filteredOffices =
    activeOfficeFilter === 'all'
      ? OFFICE_OFFERS
      : OFFICE_OFFERS.filter((item) => item.category === activeOfficeFilter);

  // Testimonial slider controls
  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Contact form validation & submission
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Пожалуйста, укажите ваше имя (минимум 2 символа)';
    }
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || digitsOnly.length < 10) {
      errors.phone = 'Введите корректный номер телефона (например, +7 700 000 00 00)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Введите корректный адрес электронной почты';
    }
    if (!formData.spaceType) {
      errors.spaceType = 'Выберите интересующий тип помещения';
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 750);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C222B] font-sans antialiased selection:bg-[#C5A46D] selection:text-white overflow-x-hidden">
      {/* Google Fonts for Architectural Editorial Typography with full Cyrillic */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@300;400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* =====================================================================
          SECTION 1 — HEADER / NAVIGATION
      ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(14,23,38,0.06)] border-b border-[#E2DFD9] py-3'
            : 'bg-[#0E1726]/75 backdrop-blur-sm border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            aria-label="ATRIUM BUSINESS CENTER — На главную"
          >
            <AtriumLogo light={!isScrolled} compact={isScrolled} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-[#C5A46D] hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled
                    ? 'text-[#1C222B] hover:text-[#9F7E46]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Burger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('#contacts')}
              className={`hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] px-5 py-2.5 transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? 'bg-[#0E1726] text-white hover:bg-[#C5A46D] hover:text-[#0E1726]'
                  : 'bg-[#C5A46D] text-[#0E1726] hover:bg-white hover:text-[#0E1726]'
              }`}
            >
              <span>Связаться с нами</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Animated Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
              className={`xl:hidden p-2.5 border transition-colors cursor-pointer ${
                isScrolled
                  ? 'border-[#E2DFD9] text-[#0E1726] hover:border-[#0E1726]'
                  : 'border-white/20 text-white hover:border-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0E1726] border-t border-white/10 ${
            mobileMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-6 flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-white/90 hover:text-[#C5A46D] text-base font-medium py-1.5 border-b border-white/10 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]/70" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('#contacts')}
              className="mt-2 w-full bg-[#C5A46D] text-[#0E1726] font-semibold text-sm py-3.5 px-5 flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              <span>Связаться с нами</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 2 — HERO SECTION
      ===================================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen flex items-center bg-[#0E1726] pt-24 pb-16 overflow-hidden"
      >
        {/* Background Architectural Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Современный стеклянный фасад бизнес-центра ATRIUM в Алматы"
            className={`w-full h-full object-cover object-center transition-transform duration-[2200ms] ease-out ${
              heroLoaded ? 'scale-100' : 'scale-105'
            }`}
          />
          {/* Sophisticated Multi-Layer Architectural Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1726]/92 via-[#0E1726]/74 to-[#0E1726]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726] via-transparent to-[#0E1726]/40" />
        </div>

        {/* Subtle Architectural Grid Lines Overlay */}
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow Tag */}
            <div
              className={`inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#C5A46D]/40 bg-[#0E1726]/60 backdrop-blur-sm mb-7 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-[#C5A46D]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#C5A46D] font-medium">
                Бизнес-центр класса А+ • Алматы
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white font-semibold leading-[1.08] tracking-[-0.01em] mb-6 transition-all duration-700 delay-150 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Пространство для бизнеса нового поколения
            </h1>

            {/* Supporting Text */}
            <p
              className={`text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-300 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Современная инфраструктура, комфортная рабочая среда и возможности для развития вашего бизнеса в самом сердце Алматы.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 delay-500 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                type="button"
                onClick={() => scrollToSection('#offices')}
                className="px-8 py-4 bg-[#C5A46D] text-[#0E1726] font-semibold text-sm tracking-[0.05em] uppercase hover:bg-white transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Выбрать офис</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#contacts')}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/30 text-white font-medium text-sm tracking-[0.05em] uppercase hover:bg-white hover:text-[#0E1726] hover:border-white transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Связаться с нами</span>
              </button>
            </div>
          </div>

          {/* Architectural Bottom Highlight Strip inside Hero */}
          <div
            className={`mt-16 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/75 text-xs tracking-wide transition-all duration-700 delay-700 ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[#C5A46D] font-serif text-lg">01</span>
              <span>Панорамное остекление и вид на предгорья Заилийского Алатау</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#C5A46D] font-serif text-lg">02</span>
              <span>Гибкие офисные блоки, коворкинг и конференц-пространства</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#C5A46D] font-serif text-lg">03</span>
              <span>Интеллектуальная инженерия и круглосуточный консьерж-сервис</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — BUSINESS CENTER STATISTICS
      ===================================================================== */}
      <section
        ref={statsRef}
        aria-label="Ключевые показатели бизнес-центра"
        className="bg-[#F5F4F0] border-b border-[#E2DFD9]"
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2DFD9]">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="py-10 sm:py-12 px-4 sm:px-8 first:pl-0 last:pr-0 flex flex-col justify-between group"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9F7E46] font-semibold mb-3">
                  ATRIUM • ПОКАЗАТЕЛЬ
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#0E1726] tracking-tight mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    formatSpaces={stat.formatSpaces}
                    trigger={statsVisible}
                  />
                </div>
                <div className="text-base font-semibold text-[#1C222B] mb-1">{stat.label}</div>
                <p className="text-xs text-[#646A73] leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 — ABOUT THE BUSINESS CENTER
      ===================================================================== */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Architectural Interior Photograph */}
            <RevealSection className="lg:col-span-6">
              <div className="relative">
                {/* Architectural Gold Offset Accent Frame */}
                <div className="hidden sm:block absolute -top-4 -left-4 w-36 h-36 border-t-2 border-l-2 border-[#C5A46D] z-0" />
                <div className="relative z-10 overflow-hidden bg-[#F5F4F0]">
                  <img
                    src={IMAGES.about}
                    alt="Интерьер атриума и общественных зон ATRIUM BUSINESS CENTER"
                    className="w-full h-[420px] sm:h-[540px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                {/* Architectural Caption Card */}
                <div className="bg-[#0E1726] text-white p-6 sm:p-7 sm:max-w-xs sm:ml-auto sm:-mt-16 relative z-20 border-l-2 border-[#C5A46D]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#C5A46D] mb-1.5">
                    Архитектурная концепция
                  </p>
                  <p className="text-sm text-white/85 leading-relaxed">
                    Синтез функциональной геометрии, натуральных материалов и передовых стандартов устойчивого девелопмента.
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* Right Column: Narrative & 3 Pillars */}
            <RevealSection delay={150} className="lg:col-span-6">
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                О бизнес-центре
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.14] mb-6">
                Больше, чем просто офис
              </h2>
              <p className="text-base sm:text-[17px] text-[#4B525C] leading-relaxed mb-5">
                <strong className="text-[#0E1726] font-semibold">ATRIUM BUSINESS CENTER</strong> — это флагманский деловой комплекс в Алматы, созданный для амбициозных компаний, предпринимателей и международных команд, для которых важны статус, технологичность и безупречная организация рабочего пространства.
              </p>
              <p className="text-sm sm:text-base text-[#646A73] leading-relaxed mb-10">
                Мы объединили эстетику современной деловой архитектуры, гибкие планировочные решения и продуманную экосистему сервисов, чтобы резиденты могли сосредоточиться на стратегическом росте своего бизнеса.
              </p>

              {/* Three Benefits */}
              <div className="space-y-6 border-t border-[#E2DFD9] pt-8">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 shrink-0 border border-[#C5A46D]/60 bg-[#F5F4F0] flex items-center justify-center text-[#0E1726]">
                    <ShieldCheck className="w-5 h-5 text-[#9F7E46]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-xs font-serif text-[#9F7E46] font-semibold">01</span>
                      <h3 className="text-lg font-semibold text-[#0E1726]">Безопасность</h3>
                    </div>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      Круглосуточная охрана и современные системы контроля доступа.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 shrink-0 border border-[#C5A46D]/60 bg-[#F5F4F0] flex items-center justify-center text-[#0E1726]">
                    <MapPin className="w-5 h-5 text-[#9F7E46]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-xs font-serif text-[#9F7E46] font-semibold">02</span>
                      <h3 className="text-lg font-semibold text-[#0E1726]">Удобная локация</h3>
                    </div>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      Удобное расположение и развитая городская инфраструктура.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 shrink-0 border border-[#C5A46D]/60 bg-[#F5F4F0] flex items-center justify-center text-[#0E1726]">
                    <Cpu className="w-5 h-5 text-[#9F7E46]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-xs font-serif text-[#9F7E46] font-semibold">03</span>
                      <h3 className="text-lg font-semibold text-[#0E1726]">Современная инфраструктура</h3>
                    </div>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      Всё необходимое для комфортной и продуктивной работы.
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — OUR SPACES (ASYMMETRICAL EDITORIAL GALLERY)
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5F4F0] border-y border-[#E2DFD9]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                Архитектура среды
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.12]">
                Пространство для ваших идей
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#646A73] max-w-md leading-relaxed">
              Каждая функциональная зона ATRIUM спроектирована с учётом акустики, эргономики и сценариев делового взаимодействия.
            </p>
          </RevealSection>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {SPACES_DATA.map((space, idx) => (
              <RevealSection
                key={space.id}
                delay={idx * 70}
                className={`group relative overflow-hidden bg-[#0E1726] cursor-pointer ${space.gridClass}`}
              >
                <div
                  onClick={() => setSelectedSpace(space)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedSpace(space);
                    }
                  }}
                  className="w-full h-full relative flex flex-col justify-end p-7 sm:p-8"
                >
                  {/* Background Photo */}
                  <img
                    src={space.image}
                    alt={space.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Editorial Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/92 via-[#0E1726]/40 to-transparent transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-serif text-2xl sm:text-[28px] text-white font-semibold leading-tight">
                        {space.title}
                      </h3>
                      <span className="w-9 h-9 border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#C5A46D] group-hover:text-[#0E1726] group-hover:border-[#C5A46D] transition-all duration-300 shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    <p className="text-sm text-white/80 leading-relaxed max-w-lg mb-4">
                      {space.shortDesc}
                    </p>

                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C5A46D] font-semibold group-hover:text-white transition-colors">
                      <span>Подробнее</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 — OFFICE RENTAL
      ===================================================================== */}
      <section id="offices" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <RevealSection className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                Аренда помещений
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.12]">
                Найдите пространство для вашего бизнеса
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Фильтр форматов офисов">
              {[
                { id: 'all', label: 'Все форматы' },
                { id: 'private', label: 'Приватные офисы' },
                { id: 'openspace', label: 'Open Space' },
                { id: 'corporate', label: 'Корпоративные блоки' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeOfficeFilter === tab.id}
                  onClick={() => setActiveOfficeFilter(tab.id)}
                  className={`px-4 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide border transition-all duration-200 cursor-pointer ${
                    activeOfficeFilter === tab.id
                      ? 'bg-[#0E1726] text-white border-[#0E1726]'
                      : 'bg-white text-[#4B525C] border-[#E2DFD9] hover:border-[#0E1726] hover:text-[#0E1726]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealSection>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredOffices.map((office, idx) => (
              <RevealSection
                key={office.id}
                delay={idx * 100}
                className="border border-[#E2DFD9] bg-white flex flex-col justify-between group hover:border-[#C5A46D] hover:shadow-[0_20px_50px_rgba(14,23,38,0.07)] transition-all duration-300"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden bg-[#F5F4F0]">
                    <img
                      src={office.image}
                      alt={office.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#0E1726]/90 backdrop-blur-sm text-white text-[11px] uppercase tracking-[0.16em] px-3.5 py-1.5 border-l-2 border-[#C5A46D]">
                      {office.badge}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-7 sm:p-8">
                    <h3 className="font-serif text-2xl sm:text-[26px] text-[#0E1726] font-semibold leading-snug mb-3">
                      {office.title}
                    </h3>
                    <p className="text-sm text-[#646A73] leading-relaxed mb-6">
                      {office.description}
                    </p>

                    {/* Key Architectural Parameters */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E2DFD9] mb-6">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#646A73] mb-1">
                          <Maximize2 className="w-3.5 h-3.5 text-[#9F7E46]" />
                          <span>Площадь</span>
                        </div>
                        <div className="text-base font-semibold text-[#0E1726]">{office.area}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#646A73] mb-1">
                          <Users className="w-3.5 h-3.5 text-[#9F7E46]" />
                          <span>Вместимость</span>
                        </div>
                        <div className="text-base font-semibold text-[#0E1726]">{office.workstations}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-[#4B525C] mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#646A73]">Расположение:</span>
                        <span className="font-medium text-[#0E1726]">{office.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#646A73]">Состояние:</span>
                        <span className="font-medium text-[#0E1726]">{office.finish}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-dashed border-[#E2DFD9]">
                        <span className="text-[#646A73]">Коммерческие условия:</span>
                        <span className="font-semibold text-[#9F7E46] uppercase tracking-wider">
                          Цена по запросу
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-7 sm:px-8 pb-7 sm:pb-8">
                  <button
                    type="button"
                    onClick={() => scrollToSection('#contacts', office.formValue)}
                    className="w-full py-3.5 px-5 bg-[#0E1726] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#C5A46D] hover:text-[#0E1726] transition-colors duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>Запросить условия аренды</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 — COWORKING
      ===================================================================== */}
      <section id="coworking" className="py-20 lg:py-28 bg-[#0E1726] text-white relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <RevealSection className="lg:col-span-6">
              <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-[#C5A46D] font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ATRIUM FLEX & COWORKING</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-white font-semibold leading-[1.12] mb-6">
                Работайте. Создавайте. Развивайтесь.
              </h2>
              <p className="text-base text-white/75 leading-relaxed mb-9 max-w-xl">
                Премиальное коворкинг-пространство в структуре ATRIUM BUSINESS CENTER объединяет эстетику клубного офиса и полную гибкость резидентских тарифов для специалистов и проектных команд.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Layers, text: 'Гибкие рабочие места' },
                  { icon: Lock, text: 'Приватные мини-офисы' },
                  { icon: Users, text: 'Переговорные комнаты' },
                  { icon: Wifi, text: 'Высокоскоростной Wi-Fi' },
                  { icon: Coffee, text: 'Комфортные лаунж-зоны' },
                ].map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 p-3.5 border border-white/10 bg-white/[0.03] hover:border-[#C5A46D]/50 transition-colors"
                    >
                      <IconComp className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      <span className="text-sm text-white/90 font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('#contacts', 'Коворкинг')}
                className="px-8 py-4 bg-[#C5A46D] text-[#0E1726] text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] hover:bg-white transition-colors duration-300 inline-flex items-center gap-3 cursor-pointer"
              >
                <span>Узнать больше</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </RevealSection>

            {/* Right Large Architectural Photograph */}
            <RevealSection delay={150} className="lg:col-span-6">
              <div className="relative">
                <div className="overflow-hidden border border-white/15">
                  <img
                    src={IMAGES.coworkingFeature}
                    alt="Дизайнерское коворкинг-пространство ATRIUM BUSINESS CENTER"
                    className="w-full h-[400px] sm:h-[520px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60 border-t border-white/10 pt-4">
                  <span>Доступ резидентов 24/7 • Юридический адрес • Деловое комьюнити</span>
                  <span className="text-[#C5A46D] uppercase tracking-widest">Условия по запросу</span>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 — INFRASTRUCTURE
      ===================================================================== */}
      <section id="infrastructure" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <RevealSection className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
              Экосистема сервиса
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.12] mb-4">
              Инфраструктура бизнес-класса
            </h2>
            <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
              Продуманные инженерные и сервисные решения обеспечивают бесперебойную работу компаний и высокий уровень комфорта для сотрудников и гостей.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E2DFD9]">
            {INFRASTRUCTURE_ITEMS.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <RevealSection
                  key={idx}
                  delay={idx * 60}
                  className="p-8 sm:p-10 border-r border-b border-[#E2DFD9] bg-white hover:bg-[#F5F4F0]/60 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 border border-[#E2DFD9] group-hover:border-[#C5A46D] bg-[#F5F4F0] group-hover:bg-[#0E1726] flex items-center justify-center mb-6 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-[#0E1726] group-hover:text-[#C5A46D] stroke-[1.6] transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0E1726] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#646A73] leading-relaxed">{item.desc}</p>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9 — TENANTS / PARTNERS
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#F5F4F0] border-y border-[#E2DFD9]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-2">
                Деловое сообщество
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0E1726] font-semibold">
                Компании выбирают нас
              </h2>
            </div>
            <p className="text-xs text-[#646A73] max-w-sm">
              Демонстрационные логотипы вымышленных компаний-резидентов для иллюстрации корпоративного пула арендаторов.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {PARTNERS.map((partner, idx) => (
              <RevealSection
                key={partner.name}
                delay={idx * 50}
                className="bg-white border border-[#E2DFD9] hover:border-[#C5A46D] p-6 flex flex-col items-center justify-center text-center text-[#4B525C] hover:text-[#0E1726] transition-all duration-300 group min-h-[124px]"
              >
                <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.svg}
                </div>
                <span className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-[#646A73] group-hover:text-[#9F7E46] transition-colors">
                  {partner.sector}
                </span>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10 — TESTIMONIALS SLIDER
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                Репутация и опыт
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.12]">
                Нам доверяют
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#646A73] mr-2 hidden sm:inline">
                Демонстрационные отзывы резидентов
              </span>
              <button
                type="button"
                onClick={handlePrevTestimonial}
                aria-label="Предыдущий отзыв"
                className="w-11 h-11 border border-[#E2DFD9] hover:border-[#0E1726] hover:bg-[#0E1726] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                aria-label="Следующий отзыв"
                className="w-11 h-11 border border-[#E2DFD9] hover:border-[#0E1726] hover:bg-[#0E1726] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </RevealSection>

          {/* Active Testimonial Display */}
          <div className="border border-[#E2DFD9] bg-[#F5F4F0] p-8 sm:p-12 lg:p-16 relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-white border border-[#E2DFD9] text-[11px] uppercase tracking-[0.16em] text-[#9F7E46] font-medium mb-6">
                  Демонстрационный отзыв • {TESTIMONIALS[activeTestimonial].area}
                </div>
                <blockquote className="font-serif text-2xl sm:text-3xl text-[#0E1726] leading-[1.38] mb-8">
                  «{TESTIMONIALS[activeTestimonial].quote}»
                </blockquote>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E2DFD9] pt-6">
                  <div>
                    <div className="text-base font-semibold text-[#0E1726]">
                      {TESTIMONIALS[activeTestimonial].author}
                    </div>
                    <div className="text-xs text-[#646A73]">
                      {TESTIMONIALS[activeTestimonial].role} — {TESTIMONIALS[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Counter & Selectors */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between gap-6 border-t lg:border-t-0 pt-6 lg:pt-0 border-[#E2DFD9]">
                <div className="font-serif text-4xl text-[#0E1726]">
                  0{activeTestimonial + 1}
                  <span className="text-lg text-[#646A73]"> / 0{TESTIMONIALS.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Показать отзыв ${idx + 1}`}
                      className={`h-2 transition-all duration-300 cursor-pointer ${
                        activeTestimonial === idx
                          ? 'w-10 bg-[#C5A46D]'
                          : 'w-2.5 bg-[#0E1726]/20 hover:bg-[#0E1726]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11 — LOCATION
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5F4F0] border-t border-[#E2DFD9]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Location Info */}
            <RevealSection className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                Локация и доступность
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0E1726] font-semibold leading-[1.12] mb-5">
                Удобное расположение в Алматы
              </h2>

              {/* Editable Address Placeholder Block */}
              <div className="p-5 bg-white border-l-2 border-[#C5A46D] border-y border-r border-[#E2DFD9] mb-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#646A73] mb-1">
                  Адрес объекта (заполнитель)
                </div>
                <div className="text-base font-semibold text-[#0E1726] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9F7E46] shrink-0" />
                  <span>Алматы, Казахстан • Деловой квартал [Улица / Проспект, №]</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#4B525C] leading-relaxed mb-8">
                Бизнес-центр ориентирован на размещение в центральной деловой части Алматы с быстрым выездом на ключевые транспортные магистрали города, удобным доступом к финансовым институтам, отелям и ресторанам для деловых встреч.
              </p>

              {/* Nearby Infrastructure Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Деловой центр города', detail: 'В окружении штаб-квартир и офисов' },
                  { title: 'Рестораны и кофейни', detail: 'Гастрономическая инфраструктура рядом' },
                  { title: 'Банки и сервисы', detail: 'Отделения банков и нотариальные бюро' },
                  { title: 'Транспортные развязки', detail: 'Удобный подъезд и остановки транспорта' },
                ].map((highlight, idx) => (
                  <div key={idx} className="p-4 bg-white border border-[#E2DFD9]">
                    <div className="text-sm font-semibold text-[#0E1726] mb-1">{highlight.title}</div>
                    <div className="text-xs text-[#646A73]">{highlight.detail}</div>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* Right Bespoke Interactive Architectural Map Schematic */}
            <RevealSection delay={150} className="lg:col-span-7">
              <div className="bg-[#0E1726] border border-[#0E1726] p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#C5A46D]" />
                    <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                      Архитектурная схема делового квартала • Алматы
                    </span>
                  </div>
                  <span className="text-[11px] text-white/50">
                    Концептуальная карта-схема
                  </span>
                </div>

                {/* Stylized Vector Architectural Quarter Map */}
                <div className="relative w-full h-[360px] sm:h-[420px] bg-[#131E31] border border-white/10 overflow-hidden">
                  <svg
                    viewBox="0 0 800 450"
                    className="w-full h-full object-cover"
                    aria-label="Схематическая карта расположения ATRIUM BUSINESS CENTER в Алматы"
                  >
                    {/* Subtle Architectural Coordinate Grid */}
                    <defs>
                      <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="800" height="450" fill="url(#archGrid)" />

                    {/* Park / Green Boulevard Zone */}
                    <path
                      d="M 520 40 L 760 40 L 760 190 L 580 190 Z"
                      fill="rgba(197, 164, 109, 0.06)"
                      stroke="rgba(197, 164, 109, 0.2)"
                      strokeDasharray="4 4"
                    />
                    <text x="615" y="115" fill="rgba(255,255,255,0.35)" fontSize="11" letterSpacing="2">
                      ПАРКОВАЯ ЗОНА
                    </text>

                    {/* City Blocks */}
                    <rect x="80" y="65" width="160" height="95" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" />
                    <rect x="290" y="65" width="180" height="95" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" />
                    <rect x="80" y="220" width="160" height="145" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" />
                    <rect x="520" y="235" width="220" height="130" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" />

                    {/* Main Avenues */}
                    <line x1="0" y1="190" x2="800" y2="190" stroke="rgba(255,255,255,0.22)" strokeWidth="10" />
                    <line x1="265" y1="0" x2="265" y2="450" stroke="rgba(255,255,255,0.18)" strokeWidth="8" />
                    <line x1="495" y1="0" x2="495" y2="450" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
                    <line x1="0" y1="395" x2="800" y2="395" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />

                    {/* Avenue Labels */}
                    <text x="35" y="183" fill="rgba(255,255,255,0.45)" fontSize="10" letterSpacing="2.5">
                      ЦЕНТРАЛЬНЫЙ ДЕЛОВОЙ ПРОСПЕКТ
                    </text>
                    <text x="275" y="34" fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="2">
                      МАГИСТРАЛЬНАЯ УЛИЦА
                    </text>

                    {/* Proximity Radius Rings around ATRIUM */}
                    <circle
                      cx="380"
                      cy="285"
                      r="95"
                      fill="rgba(197, 164, 109, 0.05)"
                      stroke="rgba(197, 164, 109, 0.25)"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx="380"
                      cy="285"
                      r="165"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeDasharray="2 6"
                    />

                    {/* Interactive Infrastructure Nodes */}
                    {/* Point 1: Financial District */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedMapPoint('finance')}
                    >
                      <circle cx="170" cy="115" r="7" fill="#0E1726" stroke="#C5A46D" strokeWidth="2" />
                      <text x="122" y="140" fill="rgba(255,255,255,0.7)" fontSize="10">
                        Финансовый кластер
                      </text>
                    </g>

                    {/* Point 2: Restaurants & Hotels */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedMapPoint('hospitality')}
                    >
                      <circle cx="615" cy="295" r="7" fill="#0E1726" stroke="#C5A46D" strokeWidth="2" />
                      <text x="562" y="320" fill="rgba(255,255,255,0.7)" fontSize="10">
                        Отели и рестораны
                      </text>
                    </g>

                    {/* Primary ATRIUM BUSINESS CENTER Pin */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedMapPoint('atrium')}
                    >
                      <rect
                        x="325"
                        y="245"
                        width="110"
                        height="80"
                        fill="rgba(197, 164, 109, 0.22)"
                        stroke="#C5A46D"
                        strokeWidth="2"
                      />
                      <circle cx="380" cy="285" r="10" fill="#C5A46D" />
                      <circle cx="380" cy="285" r="4" fill="#0E1726" />
                      <rect x="295" y="212" width="170" height="24" fill="#C5A46D" />
                      <text
                        x="380"
                        y="228"
                        textAnchor="middle"
                        fill="#0E1726"
                        fontSize="10.5"
                        fontWeight="700"
                        letterSpacing="1.5"
                      >
                        ATRIUM CENTER
                      </text>
                    </g>

                    {/* Direction to Mountains */}
                    <text x="640" y="432" fill="#C5A46D" fontSize="10" letterSpacing="2">
                      ↓ ПРЕДГОРЬЯ АЛАТАУ
                    </text>
                  </svg>

                  {/* Interactive Point Legend Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-[#0E1726]/95 backdrop-blur-md border border-white/15 p-4">
                    {selectedMapPoint === 'atrium' && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                          ATRIUM BUSINESS CENTER
                        </div>
                        <p className="text-xs text-white/80 mt-1">
                          Алматы, Казахстан. Удобный въезд в подземный паркинг и пешая доступность деловой инфраструктуры.
                        </p>
                      </div>
                    )}
                    {selectedMapPoint === 'finance' && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                          Финансовый и банковский кластер
                        </div>
                        <p className="text-xs text-white/80 mt-1">
                          5–7 минут до ключевых банковских отделений, инвестиционных фондов и консалтинговых центров.
                        </p>
                      </div>
                    )}
                    {selectedMapPoint === 'hospitality' && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                          Деловое гостеприимство
                        </div>
                        <p className="text-xs text-white/80 mt-1">
                          Бизнес-отели, рестораны для деловых обедов и фитнес-клубы в шаговой доступности.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 12 — CONTACT FORM
      ===================================================================== */}
      <section id="contacts" className="py-20 lg:py-28 bg-white border-t border-[#E2DFD9]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Invitation & Contact Placeholders */}
            <RevealSection className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#9F7E46] font-semibold mb-3">
                  Отдел аренды и резидентства
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0E1726] font-semibold leading-[1.12] mb-6">
                  Готовы найти идеальное пространство для бизнеса?
                </h2>
                <p className="text-sm sm:text-base text-[#646A73] leading-relaxed mb-10">
                  Оставьте заявку на презентацию свободных площадей или организацию индивидуального просмотра ATRIUM BUSINESS CENTER в удобное для вас время.
                </p>

                <div className="space-y-5 border-t border-[#E2DFD9] pt-8">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#9F7E46] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#646A73]">Телефон отдела аренды</div>
                      <div className="text-base font-semibold text-[#0E1726] mt-0.5">
                        +7 (727) 000-00-00 <span className="text-xs font-normal text-[#646A73]">(заполнитель)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#9F7E46] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#646A73]">Электронная почта</div>
                      <div className="text-base font-semibold text-[#0E1726] mt-0.5">
                        leasing@atrium-bc.example
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#9F7E46] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#646A73]">Режим работы офиса продаж</div>
                      <div className="text-base font-semibold text-[#0E1726] mt-0.5">
                        Пн – Пт: 09:00 – 19:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-5 bg-[#F5F4F0] border border-[#E2DFD9] text-xs text-[#646A73] leading-relaxed">
                Все коммерческие предложения формируются индивидуально с учётом требуемой площади, срока аренды и конфигурации планировки.
              </div>
            </RevealSection>

            {/* Right Interactive Contact Form */}
            <RevealSection delay={120} className="lg:col-span-7">
              <div className="bg-[#F5F4F0] border border-[#E2DFD9] p-7 sm:p-10 lg:p-12">
                {submitSuccess ? (
                  <div className="py-10 text-center max-w-lg mx-auto" role="status">
                    <div className="w-14 h-14 mx-auto bg-[#0E1726] text-[#C5A46D] flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-3xl text-[#0E1726] font-semibold mb-3">
                      Заявка успешно сформирована
                    </h3>
                    <p className="text-sm sm:text-base text-[#4B525C] leading-relaxed mb-4">
                      Благодарим вас, <strong className="text-[#0E1726]">{formData.name}</strong>. Выбранный формат помещения: <strong className="text-[#0E1726]">{formData.spaceType}</strong>.
                    </p>
                    <div className="p-4 bg-white border border-[#E2DFD9] text-xs text-[#646A73] leading-relaxed mb-8">
                      <strong>Примечание демонстрационного режима:</strong> Форма прошла полную клиентскую валидацию. Поскольку это концептуальный демонстрационный сайт без подключённого backend-сервера, данные не отправлялись на внешний сервер.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          spaceType: 'Приватный офис',
                          comment: '',
                        });
                      }}
                      className="px-7 py-3.5 bg-[#0E1726] text-white text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#C5A46D] hover:text-[#0E1726] transition-colors cursor-pointer"
                    >
                      Отправить новую заявку
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Ваше имя */}
                      <div>
                        <label
                          htmlFor="field-name"
                          className="block text-xs uppercase tracking-[0.14em] font-semibold text-[#0E1726] mb-2"
                        >
                          Ваше имя *
                        </label>
                        <input
                          id="field-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Например, Аскар Нурланов"
                          className={`w-full bg-white border px-4 py-3.5 text-sm text-[#0E1726] placeholder:text-[#9AA0A8] focus:outline-none transition-colors ${
                            formErrors.name
                              ? 'border-red-600'
                              : 'border-[#E2DFD9] focus:border-[#0E1726]'
                          }`}
                        />
                        {formErrors.name && (
                          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Телефон */}
                      <div>
                        <label
                          htmlFor="field-phone"
                          className="block text-xs uppercase tracking-[0.14em] font-semibold text-[#0E1726] mb-2"
                        >
                          Телефон *
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+7 (700) 000-00-00"
                          className={`w-full bg-white border px-4 py-3.5 text-sm text-[#0E1726] placeholder:text-[#9AA0A8] focus:outline-none transition-colors ${
                            formErrors.phone
                              ? 'border-red-600'
                              : 'border-[#E2DFD9] focus:border-[#0E1726]'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Электронная почта */}
                      <div>
                        <label
                          htmlFor="field-email"
                          className="block text-xs uppercase tracking-[0.14em] font-semibold text-[#0E1726] mb-2"
                        >
                          Электронная почта *
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="name@company.kz"
                          className={`w-full bg-white border px-4 py-3.5 text-sm text-[#0E1726] placeholder:text-[#9AA0A8] focus:outline-none transition-colors ${
                            formErrors.email
                              ? 'border-red-600'
                              : 'border-[#E2DFD9] focus:border-[#0E1726]'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Тип помещения */}
                      <div>
                        <label
                          htmlFor="field-spaceType"
                          className="block text-xs uppercase tracking-[0.14em] font-semibold text-[#0E1726] mb-2"
                        >
                          Тип помещения *
                        </label>
                        <select
                          id="field-spaceType"
                          value={formData.spaceType}
                          onChange={(e) => handleInputChange('spaceType', e.target.value)}
                          className="w-full bg-white border border-[#E2DFD9] focus:border-[#0E1726] px-4 py-3.5 text-sm text-[#0E1726] focus:outline-none transition-colors"
                        >
                          <option value="Приватный офис">Приватный офис</option>
                          <option value="Open Space">Open Space</option>
                          <option value="Корпоративное пространство">Корпоративное пространство</option>
                          <option value="Коворкинг">Коворкинг</option>
                          <option value="Конференц-зал / Переговорная">Конференц-зал / Переговорная</option>
                        </select>
                      </div>
                    </div>

                    {/* Комментарий */}
                    <div>
                      <label
                        htmlFor="field-comment"
                        className="block text-xs uppercase tracking-[0.14em] font-semibold text-[#0E1726] mb-2"
                      >
                        Комментарий
                      </label>
                      <textarea
                        id="field-comment"
                        rows={4}
                        value={formData.comment}
                        onChange={(e) => handleInputChange('comment', e.target.value)}
                        placeholder="Укажите желаемую площадь, количество сотрудников или удобное время для связи..."
                        className="w-full bg-white border border-[#E2DFD9] focus:border-[#0E1726] px-4 py-3.5 text-sm text-[#0E1726] placeholder:text-[#9AA0A8] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-[#646A73]">
                        Нажимая кнопку, вы соглашаетесь с{' '}
                        <button
                          type="button"
                          onClick={() => setPrivacyModalOpen(true)}
                          className="underline text-[#0E1726] hover:text-[#9F7E46] cursor-pointer"
                        >
                          политикой конфиденциальности
                        </button>
                        .
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 bg-[#0E1726] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] hover:bg-[#C5A46D] hover:text-[#0E1726] disabled:opacity-60 transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Обработка...</span>
                          </>
                        ) : (
                          <>
                            <span>Отправить заявку</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 13 — FOOTER
      ===================================================================== */}
      <footer className="bg-[#0E1726] text-white border-t border-white/10">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
            {/* Brand & Description */}
            <div className="lg:col-span-4">
              <AtriumLogo light />
              <p className="mt-6 text-sm text-white/65 leading-relaxed max-w-sm">
                ATRIUM BUSINESS CENTER — архитектурный деловой комплекс класса А+ в Алматы. Офисные пространства, коворкинг и современная инфраструктура для роста бизнеса.
              </p>

              {/* Minimalist Social Icons */}
              <div className="flex items-center gap-3 mt-7">
                {[
                  { label: 'Instagram', code: 'IG' },
                  { label: 'LinkedIn', code: 'IN' },
                  { label: 'Telegram', code: 'TG' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#contacts"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#contacts');
                    }}
                    aria-label={social.label}
                    className="w-9 h-9 border border-white/20 hover:border-[#C5A46D] hover:text-[#C5A46D] flex items-center justify-center text-[11px] font-semibold tracking-wider text-white/80 transition-colors"
                  >
                    {social.code}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-semibold mb-5">
                Навигация
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm text-white/75">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="hover:text-[#C5A46D] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Placeholders */}
            <div className="lg:col-span-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-semibold mb-5">
                Контакты (демо-данные)
              </div>
              <ul className="space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A46D] mt-1 shrink-0" />
                  <span>Алматы, Казахстан • [Адрес-заполнитель]</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>+7 (727) 000-00-00</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>info@atrium-bc.example</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Conceptual Disclaimer */}
          <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs text-white/55">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>© {new Date().getFullYear()} ATRIUM BUSINESS CENTER. Все права защищены.</span>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="text-white/70 hover:text-[#C5A46D] underline transition-colors cursor-pointer"
              >
                Политика конфиденциальности
              </button>
            </div>

            <div className="px-3.5 py-2 border border-white/15 bg-white/[0.03] text-white/75">
              Концептуальный демонстрационный проект. Не является официальным сайтом реального бизнес-центра.
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING BACK-TO-TOP BUTTON
      ===================================================================== */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Наверх страницы"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#0E1726] border border-[#C5A46D]/60 text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0E1726] shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* =====================================================================
          INTERACTIVE SPACE DETAIL LIGHTBOX MODAL (SECTION 5)
      ===================================================================== */}
      {selectedSpace && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1726]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedSpace(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="space-modal-title"
        >
          <div
            className="bg-white max-w-3xl w-full overflow-hidden border border-[#E2DFD9] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80 bg-[#0E1726]">
              <img
                src={selectedSpace.image}
                alt={selectedSpace.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedSpace(null)}
                aria-label="Закрыть окно"
                className="absolute top-4 right-4 w-10 h-10 bg-[#0E1726]/90 text-white hover:bg-[#C5A46D] hover:text-[#0E1726] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 sm:p-9">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9F7E46] font-semibold mb-2">
                ATRIUM BUSINESS CENTER • ПРОСТРАНСТВА
              </div>
              <h3
                id="space-modal-title"
                className="font-serif text-3xl text-[#0E1726] font-semibold mb-4"
              >
                {selectedSpace.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B525C] leading-relaxed mb-6">
                {selectedSpace.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {selectedSpace.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#F5F4F0] border border-[#E2DFD9] flex items-center gap-2.5 text-xs font-medium text-[#0E1726]"
                  >
                    <Check className="w-4 h-4 text-[#9F7E46] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#E2DFD9]">
                <button
                  type="button"
                  onClick={() => setSelectedSpace(null)}
                  className="px-6 py-3 border border-[#E2DFD9] text-xs font-semibold uppercase tracking-wider text-[#4B525C] hover:border-[#0E1726] hover:text-[#0E1726] transition-colors cursor-pointer"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetType = selectedSpace.formType;
                    setSelectedSpace(null);
                    scrollToSection('#contacts', targetType);
                  }}
                  className="px-7 py-3 bg-[#0E1726] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A46D] hover:text-[#0E1726] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Запросить условия</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PRIVACY POLICY MODAL
      ===================================================================== */}
      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1726]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPrivacyModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div
            className="bg-white max-w-xl w-full p-7 sm:p-9 border border-[#E2DFD9] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2DFD9]">
              <h3 id="privacy-modal-title" className="font-serif text-2xl text-[#0E1726] font-semibold">
                Политика конфиденциальности
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                aria-label="Закрыть политику конфиденциальности"
                className="p-2 text-[#4B525C] hover:text-[#0E1726] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-[#4B525C] leading-relaxed">
              <p>
                Настоящий веб-сайт «ATRIUM BUSINESS CENTER» является концептуальным демонстрационным проектом, разработанным для презентации возможностей веб-разработки и проектирования интерфейсов в сегменте коммерческой недвижимости.
              </p>
              <p>
                Введённые в форму обратной связи данные обрабатываются исключительно в браузере пользователя для демонстрации работы клиентской валидации и не передаются третьим лицам или на внешние серверы.
              </p>
            </div>
            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-6 py-3 bg-[#0E1726] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A46D] hover:text-[#0E1726] transition-colors cursor-pointer"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}