/* ==========================================================================
   Projects shown in the "Projects" section.
   While this list is empty the section shows a "coming soon" note.

   To add a project, copy the template below into the list and fill it in.
   Put images in assets/projects/<id>/ .

   Text fields take either one string, or one per language:
     title: "My App"
     title: { en: "My App", az: "Mənim tətbiqim", ru: "...", tr: "..." }
   A missing language falls back to English.

   {
     id: "my-app",                                   // unique, used in the URL (#project-my-app)
     title: "My App",
     summary: "One or two lines shown on the card.",
     description: "Full write-up shown when the card is opened.\n\nA blank line starts a new paragraph.",
     year: "2025",
     role: "Fullstack",                              // optional
     cover: "assets/projects/my-app/cover.jpg",      // card image; the first screenshot if left out
     screenshots: [
       "assets/projects/my-app/1.jpg",
       "assets/projects/my-app/2.jpg",
     ],
     tags: ["React", "Node.js", "PostgreSQL"],
     links: {
       demo: "https://my-app.example.com",           // "Live demo" button
       source: "https://github.com/goshgarhasanov/my-app", // "Source code" button
     },
   },
   ========================================================================== */

window.PROJECTS = [
  {
    id: "sysinspector",
    title: "SysInspector.az",
    summary: {
      en: "Desktop and terminal app for Linux and Windows: hardware details, component health, counterfeit-part checks and CPU / RAM stress tests.",
      az: "Linux və Windows üçün masaüstü və terminal proqramı: avadanlıq məlumatı, komponentlərin vəziyyəti, saxta hissə yoxlaması və CPU / RAM stres testləri.",
      ru: "Десктопное и консольное приложение для Linux и Windows: сведения о железе, состояние компонентов, проверка на подделки и стресс-тесты CPU / RAM.",
      tr: "Linux ve Windows için masaüstü ve terminal uygulaması: donanım bilgisi, bileşen sağlığı, sahte parça kontrolü ve CPU / RAM stres testleri.",
    },
    description: {
      en: "SysInspector.az shows everything about a computer in one place — processor, memory, disks, graphics, drivers, battery and sensors — and rates every component as GOOD, FAIR or POOR. Disk health comes from SMART data: remaining SSD life, data written, power-on hours and bad sectors.\n\nThe authenticity check looks for the traces counterfeit or tampered parts leave behind: a drive whose real capacity does not match its label, an NVMe controller that does not belong to the brand on the sticker, a graphics card with less VRAM than its model should have, a battery reporting more than its design capacity, and an unofficially activated Windows.\n\nThe CPU stress test verifies its own math on every thread and stops itself if the temperature gets too high; the RAM test writes and checks patterns. The full report can be saved as an Excel workbook that the app writes itself, with no Office or extra library needed.\n\nIt is written in C++20 and Qt 6, runs on Linux and Windows, and also has a terminal version with a full-screen menu and script-friendly commands. The interface is available in Azerbaijani and English.",
      az: "SysInspector.az kompüter haqqında hər şeyi bir yerdə göstərir — prosessor, operativ yaddaş, disklər, qrafika, drayverlər, batareya və sensorlar — və hər komponenti YAXŞI, ORTA və ya PİS kimi qiymətləndirir. Disklərin vəziyyəti SMART məlumatından götürülür: SSD-nin qalan ömrü, yazılan data həcmi, işləmə saatları və xarab sektorlar.\n\nOrijinallıq yoxlaması saxta və ya dəyişdirilmiş hissələrin geridə qoyduğu izləri axtarır: real tutumu etiketindəki ilə üst-üstə düşməyən disk, üzərindəki brendə aid olmayan NVMe kontroller, modelinə görə olmalı olduğundan az VRAM-ı olan videokart, layihə tutumundan çox göstərən batareya və qeyri-rəsmi aktivləşdirilmiş Windows.\n\nCPU stres testi hər axında öz hesablamalarını yoxlayır və temperatur həddən artıq qalxanda özü dayanır; RAM testi yaddaşa naxışlar yazıb yoxlayır. Tam hesabatı Excel faylı kimi saxlamaq olar — faylı proqramın özü yazır, Office və ya əlavə kitabxana lazım deyil.\n\nC++20 və Qt 6 ilə yazılıb, Linux və Windows-da işləyir. Tam ekran menyulu və skriptlər üçün əmrləri olan terminal versiyası da var. İnterfeys Azərbaycan və ingilis dillərindədir.",
      ru: "SysInspector.az показывает всё о компьютере в одном месте — процессор, память, диски, графику, драйверы, батарею и датчики — и оценивает каждый компонент как ХОРОШО, СРЕДНЕ или ПЛОХО. Состояние дисков берётся из SMART: оставшийся ресурс SSD, объём записанных данных, часы работы и битые сектора.\n\nПроверка подлинности ищет следы, которые оставляют поддельные или изменённые детали: диск, реальный объём которого не совпадает с надписью на этикетке, NVMe-контроллер, не принадлежащий бренду с наклейки, видеокарту с меньшим объёмом VRAM, чем положено модели, батарею, показывающую ёмкость больше заводской, и неофициально активированную Windows.\n\nСтресс-тест CPU проверяет собственные вычисления на каждом потоке и сам останавливается при перегреве; тест RAM записывает и сверяет шаблоны. Полный отчёт можно сохранить в виде Excel-файла, который приложение пишет само — без Office и дополнительных библиотек.\n\nНаписано на C++20 и Qt 6, работает в Linux и Windows. Есть и консольная версия с полноэкранным меню и командами для скриптов. Интерфейс на азербайджанском и английском.",
      tr: "SysInspector.az bir bilgisayar hakkındaki her şeyi tek yerde gösterir — işlemci, bellek, diskler, grafik, sürücüler, pil ve sensörler — ve her bileşeni İYİ, ORTA veya KÖTÜ olarak değerlendirir. Disk sağlığı SMART verisinden gelir: SSD'nin kalan ömrü, yazılan veri miktarı, çalışma saatleri ve bozuk sektörler.\n\nOrijinallik kontrolü sahte veya kurcalanmış parçaların bıraktığı izleri arar: gerçek kapasitesi etiketiyle uyuşmayan disk, üzerindeki markaya ait olmayan NVMe denetleyici, modelinin olması gerekenden az VRAM'e sahip ekran kartı, tasarım kapasitesinden fazlasını gösteren pil ve resmi olmayan yollarla etkinleştirilmiş Windows.\n\nCPU stres testi her iş parçacığında kendi hesaplarını doğrular ve sıcaklık fazla yükselirse kendini durdurur; RAM testi belleğe desenler yazıp kontrol eder. Tam rapor, uygulamanın kendisinin yazdığı bir Excel dosyası olarak kaydedilebilir — Office ya da ek kütüphane gerekmez.\n\nC++20 ve Qt 6 ile yazıldı, Linux ve Windows'ta çalışır. Tam ekran menülü ve betikler için komutları olan bir terminal sürümü de var. Arayüz Azerbaycan Türkçesi ve İngilizce.",
    },
    year: "2026",
    role: { en: "Desktop app", az: "Masaüstü proqram", ru: "Десктопное приложение", tr: "Masaüstü uygulama" },
    cover: "assets/projects/sysinspector/overview-en.png",
    screenshots: [
      "assets/projects/sysinspector/overview-en.png",
      "assets/projects/sysinspector/overview-az.png",
      "assets/projects/sysinspector/processor-en.png",
      "assets/projects/sysinspector/drivers-az.png",
      "assets/projects/sysinspector/battery-en.png",
      "assets/projects/sysinspector/stress-az.png",
    ],
    tags: ["C++20", "Qt 6", "CMake", "Linux", "Windows"],
    links: {
      source: "https://github.com/goshgarhasanov/SysInspector.az",
    },
  },
];
