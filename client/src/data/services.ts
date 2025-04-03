import { 
  GraduationCap, 
  Globe, 
  Code, 
  Shield, 
  FileText, 
  Pen, 
  Search, 
  BookOpen, 
  BookCopy, 
  PresentationIcon, 
  Table, 
  FileEdit, 
  Database, 
  Smartphone,
  Server,
  Cpu,
  MoreHorizontal
} from "lucide-react";

// Service data with icons and translation keys
export const services = [
  {
    icon: GraduationCap,
    translationKey: "schoolProjects",
    imageKey: "schoolProjectsImage"
  },
  {
    icon: Globe,
    translationKey: "webdev",
    imageKey: "webDevImage"
  },
  {
    icon: Code,
    translationKey: "freelance",
    imageKey: "freelanceImage"
  },
  {
    icon: Shield,
    translationKey: "security",
    imageKey: "securityImage"
  },
  {
    icon: FileText,
    translationKey: "report",
    imageKey: "reportImage"
  },
  {
    icon: Pen,
    translationKey: "content",
    imageKey: "contentImage"
  },
  {
    icon: Search,
    translationKey: "seo",
    imageKey: "seoImage"
  },
  {
    icon: BookOpen,
    translationKey: "thesis",
    imageKey: "thesisImage"
  },
  {
    icon: BookCopy,
    translationKey: "dissertation",
    imageKey: "dissertationImage"
  },
  {
    icon: PresentationIcon,
    translationKey: "presentations",
    imageKey: "presentationsImage"
  },
  {
    icon: Table,
    translationKey: "excel",
    imageKey: "excelImage"
  },
  {
    icon: FileEdit,
    translationKey: "copywriting",
    imageKey: "copywritingImage"
  },
  {
    icon: Database,
    translationKey: "dataEntry",
    imageKey: "dataEntryImage"
  },
  {
    icon: Smartphone,
    translationKey: "mobileApp",
    imageKey: "mobileAppImage"
  },
  {
    icon: Server,
    translationKey: "cloudServices",
    imageKey: "cloudServicesImage"
  },
  {
    icon: Cpu,
    translationKey: "aiMlModel",  // New service: AI & ML Model
    imageKey: "aiMlModelImage",
    title: "AI & ML Model Development", // Title for the card
    description: "Leverage advanced AI and ML models to optimize processes, enhance decision-making, and drive innovation.", // Description for the card
  },
  {
    icon: MoreHorizontal,
    translationKey: "others",  // New service: Others
    imageKey: "othersImage",
    title: "Custom Solutions & Other Services", // Title for the card
    description: "Explore a variety of additional services tailored to meet your unique business needs and challenges.", // Description for the card
  }
];