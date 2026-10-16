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
     logo: "assets/projects/my-app/logo.png",        // optional: shown centred on the card when there is no cover or screenshot
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
    id: "bootaz",
    title: "BootAz",
    summary: {
      en: "Rufus-style bootable USB creator for Windows and Linux: write Windows and Linux ISOs to a flash drive from either OS — modern GUI and CLI.",
      az: "Windows və Linux üçün Rufus tipli yüklənən fləş yaradıcısı: Windows və Linux ISO-larını istənilən sistemdən fləşə yazır — müasir GUI və CLI.",
      ru: "Создание загрузочных флешек в стиле Rufus для Windows и Linux: запись ISO Windows и Linux на флешку из любой ОС — современный GUI и CLI.",
      tr: "Windows ve Linux için Rufus tarzı önyüklenebilir USB oluşturucu: Windows ve Linux ISO'larını her iki sistemden de flash belleğe yazar — modern GUI ve CLI.",
    },
    description: {
      en: "BootAz turns an ISO or disk image into a bootable USB drive. It covers what Rufus does — ISO and DD modes, GPT / MBR, UEFI and BIOS, FAT32 (without the 32 GB limit), NTFS, exFAT and ext4, UEFI:NTFS, Linux persistence, bad-block checks and checksums — and also runs on Linux.\n\nA Windows 11 USB written on Linux with BootAz boots on both UEFI and BIOS and installs all the way to the desktop. There are three ways to handle an install.wim over 4 GB: NTFS with UEFI:NTFS, FAT32 plus NTFS, or a split WIM. Windows setup can be customised too: skip the TPM / Secure Boot / RAM checks, install without a Microsoft account, create a local account and turn off automatic BitLocker. The drive gets a label that names the system on it, such as \"WIN11 X64\".\n\nBeyond Rufus it has a fake-capacity check (a full test and a quick one that keeps your files), read-back verification after every write, an early warning for boot loaders signed only with the 2011 Secure Boot certificate, writing to several drives at once, ISO downloads from official sources with checksum verification, saving a drive as an image and restoring a drive to normal use.\n\nIt is written in C++20 with a pure-C++ core shared by a Qt 6 GUI and a scriptable CLI with JSON output. Elevated privileges are taken only for the write itself, and system disks are detected and protected. Unit, integration and QEMU boot tests cover it, along with a security review. The interface is in Azerbaijani and English.",
      az: "BootAz ISO və ya disk obrazını yüklənən USB fləşə çevirir. Rufus-un etdiklərini edir — ISO və DD rejimləri, GPT / MBR, UEFI və BIOS, FAT32 (32 GB limiti olmadan), NTFS, exFAT və ext4, UEFI:NTFS, Linux persistence, bad block yoxlaması və hash-lar — üstəlik Linux-da da işləyir.\n\nLinux-da BootAz ilə yazılmış Windows 11 fləşi həm UEFI, həm BIOS-da açılır və masaüstünə qədər tam quraşdırılır. 4 GB-dan böyük install.wim üçün üç üsul var: NTFS + UEFI:NTFS, FAT32 + NTFS və ya bölünmüş WIM. Windows quraşdırmasını da tənzimləmək olur: TPM / Secure Boot / RAM yoxlamalarını keçmək, Microsoft hesabı olmadan quraşdırmaq, lokal hesab yaratmaq və avtomatik BitLocker-i söndürmək. Fləşin adı üzərindəki sistemə görə verilir, məsələn \"WIN11 X64\".\n\nRufus-dan artıq olaraq saxta tutum yoxlaması (tam test və faylları silməyən sürətli test), hər yazmadan sonra geri oxuyub yoxlama, yalnız 2011 Secure Boot sertifikatı ilə imzalanmış yükləyicilər üçün əvvəlcədən xəbərdarlıq, eyni anda bir neçə fləşə yazma, rəsmi mənbələrdən ISO yükləyib checksum ilə yoxlama, fləşi obraz kimi saxlama və fləşi adi vəziyyətə qaytarma var.\n\nC++20 ilə yazılıb: sırf C++ nüvəsini həm Qt 6 GUI, həm də JSON çıxışlı, skriptlər üçün uyğun CLI istifadə edir. Yüksək imtiyaz yalnız yazma işinin özü üçün alınır, sistem diskləri tanınır və qorunur. Unit, inteqrasiya və QEMU yükləmə testləri, həmçinin təhlükəsizlik review-u aparılıb. İnterfeys Azərbaycan və ingilis dillərindədir.",
      ru: "BootAz превращает ISO или образ диска в загрузочную флешку. Он умеет то же, что Rufus — режимы ISO и DD, GPT / MBR, UEFI и BIOS, FAT32 (без ограничения в 32 ГБ), NTFS, exFAT и ext4, UEFI:NTFS, persistence для Linux, проверку на битые блоки и контрольные суммы — и при этом работает и в Linux.\n\nФлешка с Windows 11, записанная BootAz в Linux, загружается и в UEFI, и в BIOS и устанавливает систему до рабочего стола. Для install.wim больше 4 ГБ есть три способа: NTFS + UEFI:NTFS, FAT32 + NTFS или разбитый WIM. Установку Windows можно настроить: обойти проверки TPM / Secure Boot / RAM, установить без учётной записи Microsoft, создать локальную учётную запись и отключить автоматический BitLocker. Метка флешки называет систему на ней, например «WIN11 X64».\n\nСверх Rufus: проверка на поддельный объём (полный тест и быстрый, сохраняющий файлы), проверка чтением после каждой записи, заблаговременное предупреждение о загрузчиках, подписанных только сертификатом Secure Boot 2011 года, запись на несколько флешек одновременно, загрузка ISO с официальных источников с проверкой контрольной суммы, сохранение флешки в образ и возврат флешки в обычное состояние.\n\nНаписано на C++20: ядро на чистом C++ используют и GUI на Qt 6, и CLI для скриптов с выводом в JSON. Повышенные права берутся только на саму запись, системные диски распознаются и защищены. Есть юнит-, интеграционные тесты и тесты загрузки в QEMU, а также обзор безопасности. Интерфейс на азербайджанском и английском.",
      tr: "BootAz bir ISO ya da disk imajını önyüklenebilir USB belleğe dönüştürür. Rufus'un yaptıklarını yapar — ISO ve DD modları, GPT / MBR, UEFI ve BIOS, FAT32 (32 GB sınırı olmadan), NTFS, exFAT ve ext4, UEFI:NTFS, Linux persistence, bozuk blok kontrolü ve sağlama toplamları — üstelik Linux'ta da çalışır.\n\nLinux'ta BootAz ile yazılan Windows 11 belleği hem UEFI hem BIOS'ta açılır ve masaüstüne kadar kurulum tamamlanır. 4 GB'tan büyük install.wim için üç yol var: NTFS + UEFI:NTFS, FAT32 + NTFS ya da bölünmüş WIM. Windows kurulumu da özelleştirilebilir: TPM / Secure Boot / RAM kontrollerini atlamak, Microsoft hesabı olmadan kurmak, yerel hesap oluşturmak ve otomatik BitLocker'ı kapatmak. Belleğin etiketi üzerindeki sistemi adlandırır, örneğin \"WIN11 X64\".\n\nRufus'tan fazlası olarak sahte kapasite kontrolü (tam test ve dosyaları silmeyen hızlı test), her yazmadan sonra geri okuyarak doğrulama, yalnızca 2011 Secure Boot sertifikasıyla imzalı önyükleyiciler için önceden uyarı, aynı anda birden fazla belleğe yazma, resmi kaynaklardan ISO indirip sağlama toplamıyla doğrulama, belleği imaj olarak kaydetme ve belleği normal kullanıma döndürme var.\n\nC++20 ile yazıldı: saf C++ çekirdeğini hem Qt 6 GUI hem de JSON çıktılı, betiklere uygun CLI kullanır. Yükseltilmiş yetki yalnızca yazma işinin kendisi için alınır, sistem diskleri tanınır ve korunur. Birim, entegrasyon ve QEMU önyükleme testleri ile bir güvenlik incelemesi yapıldı. Arayüz Azerbaycan Türkçesi ve İngilizce.",
    },
    year: "2026",
    role: { en: "Desktop app", az: "Masaüstü proqram", ru: "Десктопное приложение", tr: "Masaüstü uygulama" },
    cover: "assets/projects/bootaz/main-az-linux.png",
    logo: "assets/projects/bootaz/logo.png",
    screenshots: [
      "assets/projects/bootaz/main-az-linux.png",
      "assets/projects/bootaz/main-en-light.png",
      "assets/projects/bootaz/main-az-windows.png",
      "assets/projects/bootaz/windows11-setup-uefi.png",
      "assets/projects/bootaz/windows11-installed.jpg",
      "assets/projects/bootaz/alpine-bios.png",
    ],
    tags: ["C++20", "Qt 6", "CMake", "Linux", "Windows", "UEFI"],
    links: {
      source: "https://github.com/goshgarhasanov/BootAz",
    },
  },
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
  {
    id: "phoenix-recover",
    title: "Phoenix Recover",
    summary: {
      "en": "Cross-platform data-recovery tool in Rust: deep-scan file carving and named recovery from FAT, exFAT and NTFS — desktop GUI and CLI.",
      "az": "Rust ilə yazılmış çoxplatformalı məlumat bərpası aləti: dərin skan (file carving) və FAT, exFAT, NTFS-dən adı ilə bərpa — masaüstü GUI və CLI.",
      "ru": "Кроссплатформенный инструмент восстановления данных на Rust: глубокое сканирование (carving) и восстановление с именами из FAT, exFAT и NTFS — GUI и CLI.",
      "tr": "Rust ile yazılmış çok platformlu veri kurtarma aracı: derin tarama (file carving) ve FAT, exFAT, NTFS'ten isimli kurtarma — masaüstü GUI ve CLI."
    },
    description: {
      "en": "Phoenix Recover brings back deleted and lost files from disks, USB drives and disk images, with two complementary methods. Deep scan reads the medium byte by byte and finds 37 file types by their signatures — images, video, audio, documents and archives — even when the drive was formatted or has no filesystem; each file's end is found from its footer, a size field or by parsing its structure (GIF, MP4 / MOV / HEIC, RIFF). Filesystem recovery parses FAT12/16/32, exFAT and NTFS metadata and restores deleted files with their original names and folders.\n\nIt never writes to the source: recovered files only go to a separate folder you choose, and a structured log records what was read, found and recovered. MBR and GPT partition tables are understood, so a single partition inside a whole-disk image can be scanned.\n\nOne Rust engine drives both a Tauri 2 + React desktop app with live progress and image thumbnails and a coloured CLI with an interactive menu and JSON output. Both are available in Azerbaijani, Turkish, Russian and English. The engine has unit tests plus end-to-end tests that recover deleted files from real FAT32, exFAT and NTFS volumes and check them byte for byte.",
      "az": "Phoenix Recover disklərdən, USB fləşlərdən və disk obrazlarından silinmiş və itmiş faylları iki bir-birini tamamlayan üsulla geri qaytarır. Dərin skan daşıyıcını bayt-bayt oxuyur və 37 fayl tipini imzasına görə tapır — şəkil, video, səs, sənəd və arxivlər — disk formatlansa və ya fayl sistemi olmasa belə; hər faylın sonu footer-dən, ölçü sahəsindən və ya strukturunu təhlil etməklə (GIF, MP4 / MOV / HEIC, RIFF) müəyyən edilir. Fayl sistemi bərpası FAT12/16/32, exFAT və NTFS metadatasını oxuyur və silinmiş faylları orijinal adları və qovluqları ilə qaytarır.\n\nMənbəyə heç vaxt yazmır: bərpa olunan fayllar yalnız seçdiyiniz ayrı qovluğa yazılır, strukturlaşdırılmış log isə nəyin oxunduğunu, tapıldığını və bərpa edildiyini qeyd edir. MBR və GPT bölmə cədvəllərini tanıyır, ona görə bütöv disk obrazının içindəki tək bir bölməni də skan etmək olur.\n\nTək Rust mühərriki həm canlı irəliləyiş və şəkil önizləmələri olan Tauri 2 + React masaüstü tətbiqini, həm də interaktiv menyulu və JSON çıxışlı rəngli CLI-ı idarə edir. Hər ikisi Azərbaycan, türk, rus və ingilis dillərindədir. Mühərrikin unit testləri, bir də real FAT32, exFAT və NTFS bölmələrindən silinmiş faylları bərpa edib bayt-bayt yoxlayan end-to-end testləri var.",
      "ru": "Phoenix Recover возвращает удалённые и потерянные файлы с дисков, флешек и образов дисков двумя дополняющими друг друга способами. Глубокое сканирование читает носитель побайтно и находит 37 типов файлов по сигнатурам — изображения, видео, аудио, документы и архивы — даже если диск отформатирован или файловой системы нет; конец каждого файла определяется по футеру, полю размера или разбором структуры (GIF, MP4 / MOV / HEIC, RIFF). Восстановление по файловой системе разбирает метаданные FAT12/16/32, exFAT и NTFS и возвращает удалённые файлы с исходными именами и папками.\n\nИсточник никогда не изменяется: восстановленные файлы пишутся только в отдельную выбранную папку, а структурированный лог фиксирует, что было прочитано, найдено и восстановлено. Поддерживаются таблицы разделов MBR и GPT, поэтому можно сканировать отдельный раздел внутри образа целого диска.\n\nОдин движок на Rust обслуживает и десктопное приложение на Tauri 2 + React с живым прогрессом и миниатюрами изображений, и цветной CLI с интерактивным меню и выводом в JSON. Оба доступны на азербайджанском, турецком, русском и английском. У движка есть юнит-тесты и сквозные тесты, которые восстанавливают удалённые файлы с настоящих томов FAT32, exFAT и NTFS и сверяют их побайтно.",
      "tr": "Phoenix Recover, disklerden, USB belleklerden ve disk imajlarından silinmiş ve kayıp dosyaları birbirini tamamlayan iki yöntemle geri getirir. Derin tarama ortamı bayt bayt okur ve 37 dosya türünü imzasından bulur — görsel, video, ses, belge ve arşivler — disk biçimlendirilmiş ya da dosya sistemi olmasa bile; her dosyanın sonu footer'ından, boyut alanından ya da yapısı çözümlenerek (GIF, MP4 / MOV / HEIC, RIFF) belirlenir. Dosya sistemi kurtarması FAT12/16/32, exFAT ve NTFS meta verisini çözümler ve silinmiş dosyaları özgün adları ve klasörleriyle geri getirir.\n\nKaynağa asla yazmaz: kurtarılan dosyalar yalnızca seçtiğiniz ayrı bir klasöre yazılır, yapılandırılmış log ise neyin okunduğunu, bulunduğunu ve kurtarıldığını kaydeder. MBR ve GPT bölüm tablolarını tanır, böylece tüm diskin imajı içindeki tek bir bölüm de taranabilir.\n\nTek bir Rust motoru hem canlı ilerleme ve görsel önizlemeli Tauri 2 + React masaüstü uygulamasını hem de etkileşimli menülü, JSON çıktılı renkli CLI'ı çalıştırır. İkisi de Azerbaycan Türkçesi, Türkçe, Rusça ve İngilizce. Motorun birim testleri ve gerçek FAT32, exFAT ve NTFS bölümlerinden silinmiş dosyaları kurtarıp bayt bayt doğrulayan uçtan uca testleri var."
    },
    year: "2026",
    role: {
      "en": "Desktop app",
      "az": "Masaüstü proqram",
      "ru": "Десктопное приложение",
      "tr": "Masaüstü uygulama"
    },
    screenshots: [
      "assets/projects/phoenix/results-az.png",
      "assets/projects/phoenix/source-en.png",
      "assets/projects/phoenix/scan-en.png"
    ],
    tags: [
      "Rust",
      "Tauri 2",
      "React",
      "TypeScript",
      "Tailwind"
    ],
    links: {
      "source": "https://github.com/goshgarhasanov/phoenix-recover"
    },
  },
  {
    id: "kamera-izleme-sistemi",
    title: { en: "Camera Monitoring System (NVR)", az: "Kamera İzləmə Sistemi (NVR)", ru: "Система видеонаблюдения (NVR)", tr: "Kamera İzleme Sistemi (NVR)" },
    summary: {
      en: "Web-based NVR for ONVIF IP cameras: multi-camera live view, motion recording, AI object recognition, DVR playback, PTZ and two-way audio.",
      az: "ONVIF IP kameralar üçün veb əsaslı NVR: bir neçə kameranın canlı görüntüsü, hərəkətə görə yazı, AI ilə obyekt tanıma, DVR, PTZ və iki tərəfli səs.",
      ru: "Веб-NVR для IP-камер ONVIF: живой просмотр нескольких камер, запись по движению, распознавание объектов ИИ, DVR, PTZ и двусторонний звук.",
      tr: "ONVIF IP kameralar için web tabanlı NVR: çoklu kamera canlı izleme, harekete göre kayıt, yapay zekâ ile nesne tanıma, DVR, PTZ ve çift yönlü ses.",
    },
    description: {
      en: "A surveillance system that runs 24/7 on a home or office server and is used from the browser on a computer or a phone. Cameras are added from the interface, each one runs independently, and all of them can be watched at once in a multi-view grid; a dropped stream reconnects on its own.\n\nRecording can be continuous, motion-only or off for each camera. Motion detection works on regions, so leaves and other small movements are ignored, and a pre-record buffer means every clip also contains the few seconds before the event. In the browser, a DETR model recognises people, cats, dogs, cars and other objects and draws labelled boxes around them.\n\nAll motion photos and clips appear in one chronological events feed, and the DVR page plays back any hour of the past with real timestamps — from the server or straight from the camera's SD card. Cameras can also be controlled: pan / tilt / zoom with presets, push-to-talk to the camera's speaker, sounds played through the camera, image settings, time sync and reboot. Old media is cleaned up automatically and clips can be shared to WhatsApp.\n\nThe backend is pure Node.js with Express, recording and conversion are done with ffmpeg, and the whole interface is in Azerbaijani.",
      az: "Ev və ya ofis serverində 24/7 işləyən, kompüterdən və telefondan brauzerlə istifadə olunan müşahidə sistemi. Kameralar interfeysdən əlavə olunur, hər biri müstəqil işləyir, hamısını birlikdə çoxlu görünüşdə izləmək olar; qırılan axın özü yenidən qoşulur.\n\nHər kamera üçün yazı rejimi seçilir: daimi, yalnız hərəkətdə və ya söndürülü. Hərəkət aşkarlanması zonalarla işləyir, ona görə yarpaq kimi xırda tərpənmələrə reaksiya vermir; əvvəlcədən yazı buferi sayəsində hər klipdə hadisədən əvvəlki bir neçə saniyə də olur. Brauzerdə DETR modeli insan, pişik, it, maşın və digər obyektləri tanıyıb ətrafına etiketli çərçivə çəkir.\n\nBütün hərəkət şəkilləri və klipləri tək xronoloji hadisələr lentində görünür, DVR səhifəsi isə keçmişin istənilən saatını real vaxt nişanları ilə oynadır — serverdən və ya birbaşa kameranın SD kartından. Kameraları idarə etmək də olur: preset-lərlə PTZ (çevirmə / əymə / yaxınlaşdırma), kameranın dinamikinə danışmaq, kameradan səs çalmaq, görüntü ayarları, vaxt sinxronu və yenidən başlatma. Köhnə fayllar avtomatik silinir, klipləri WhatsApp-a göndərmək mümkündür.\n\nBackend saf Node.js və Express-dir, yazı və çevirmə ffmpeg ilə aparılır, interfeys tamamilə Azərbaycan dilindədir.",
      ru: "Система видеонаблюдения, которая круглосуточно работает на домашнем или офисном сервере, а пользуются ей через браузер с компьютера или телефона. Камеры добавляются из интерфейса, каждая работает независимо, все можно смотреть одновременно в мультиэкране; оборвавшийся поток переподключается сам.\n\nДля каждой камеры выбирается режим записи: постоянно, только при движении или выключено. Детектор движения работает по зонам и не реагирует на мелочи вроде листьев, а буфер предзаписи добавляет в каждый ролик несколько секунд до события. Прямо в браузере модель DETR распознаёт людей, кошек, собак, машины и другие объекты и обводит их подписанными рамками.\n\nВсе фото и ролики движения собраны в единую хронологическую ленту событий, а страница DVR воспроизводит любой час прошлого с реальными метками времени — с сервера или прямо с SD-карты камеры. Камерами можно управлять: PTZ с пресетами, разговор через динамик камеры, воспроизведение звуков, настройки изображения, синхронизация времени и перезагрузка. Старые файлы удаляются автоматически, ролики можно отправить в WhatsApp.\n\nБэкенд — чистый Node.js с Express, запись и конвертация — через ffmpeg, интерфейс полностью на азербайджанском.",
      tr: "Ev ya da ofis sunucusunda 7/24 çalışan, bilgisayardan ve telefondan tarayıcıyla kullanılan bir güvenlik kamerası sistemi. Kameralar arayüzden eklenir, her biri bağımsız çalışır ve hepsi çoklu görünümde aynı anda izlenebilir; kopan yayın kendiliğinden yeniden bağlanır.\n\nHer kamera için kayıt modu seçilir: sürekli, yalnızca harekette ya da kapalı. Hareket algılama bölgelerle çalışır, yaprak gibi küçük kıpırtılara tepki vermez; ön kayıt tamponu sayesinde her klipte olaydan önceki birkaç saniye de bulunur. Tarayıcıda çalışan DETR modeli insan, kedi, köpek, araba gibi nesneleri tanır ve etrafına etiketli çerçeve çizer.\n\nTüm hareket fotoğrafları ve klipleri tek bir kronolojik olay akışında görünür; DVR sayfası geçmişin herhangi bir saatini gerçek zaman damgalarıyla oynatır — sunucudan ya da doğrudan kameranın SD kartından. Kameralar da kontrol edilebilir: ön ayarlı PTZ, kameranın hoparlöründen konuşma, kameradan ses çalma, görüntü ayarları, saat eşitleme ve yeniden başlatma. Eski dosyalar otomatik silinir, klipler WhatsApp'a gönderilebilir.\n\nBackend saf Node.js ve Express, kayıt ve dönüştürme ffmpeg ile yapılıyor; arayüz tamamen Azerbaycan Türkçesi.",
    },
    year: "2026",
    role: { en: "Web app", az: "Veb tətbiq", ru: "Веб-приложение", tr: "Web uygulaması" },
    screenshots: [
      "assets/projects/kamera/live.png",
      "assets/projects/kamera/multiview.png",
      "assets/projects/kamera/events.png",
      "assets/projects/kamera/sounds.png",
    ],
    tags: ["Node.js", "Express", "ffmpeg", "ONVIF", "Transformers.js"],
    links: {
      source: "https://github.com/goshgarhasanov/kamera-izleme-sistemi",
    },
  },
  {
    id: "barkod-az",
    title: "BarKod AZ",
    summary: {
      "en": "Barcode-based POS, inventory and sales system for shops — Next.js 15, PostgreSQL and Prisma.",
      "az": "Mağazalar üçün barkod əsaslı kassa (POS), anbar və satış sistemi — Next.js 15, PostgreSQL və Prisma.",
      "ru": "Кассовая (POS), складская и торговая система для магазинов на основе штрихкодов — Next.js 15, PostgreSQL и Prisma.",
      "tr": "Mağazalar için barkod tabanlı POS, stok ve satış sistemi — Next.js 15, PostgreSQL ve Prisma."
    },
    description: {
      "en": "BarKod AZ is a point-of-sale and inventory system for retail shops built around barcodes: scan to sell, scan to put stock in. The checkout prints thermal receipts and handles partial payments and customer debt; goods receipts track weighted-average cost, production and expiry dates, and waste.\n\nLabels are printed in TSPL with an on-screen preview and EAN-13 barcodes, and a networked label scale's weight barcodes are understood. Every report can be viewed on screen and downloaded as Excel. There are staff accounts with roles and a PIN gate for operations that involve money, and the database is backed up automatically every 24 hours without stopping the shop.\n\nThe shop till is an ordinary laptop, so setup needs no database administrator: one command creates the configuration, starts a bundled PostgreSQL, applies the schema and opens the app in the browser. It is written in Next.js 15, React 19 and TypeScript with Prisma, Tailwind and shadcn/ui, and is tested end to end with Playwright, including phone and tablet layouts. The interface is in Azerbaijani.\n\nThe source code is private.",
      "az": "BarKod AZ mağazalar üçün barkod üzərində qurulmuş kassa və anbar sistemidir: skan et — sat, skan et — anbara qəbul et. Kassa termal çek çap edir, hissə-hissə ödənişi və müştəri borcunu idarə edir; mal qəbulunda orta çəkili maya dəyəri, istehsal və son istifadə tarixləri, itki (silinmə) izlənir.\n\nEtiketlər ekranda önizləmə və EAN-13 barkodları ilə TSPL-də çap olunur, şəbəkəyə qoşulmuş etiket tərəzisinin çəki barkodları tanınır. Bütün hesabatlara ekranda baxmaq və Excel kimi yükləmək olur. Rollu işçi hesabları və pulla bağlı əməliyyatlar üçün PIN qoruması var, verilənlər bazası isə hər 24 saatdan bir mağazanı dayandırmadan avtomatik ehtiyat nüsxəyə alınır.\n\nMağaza kassası adi noutbukdur, ona görə qurulum üçün verilənlər bazası administratoru lazım deyil: tək əmr konfiqurasiyanı yaradır, daxili PostgreSQL-i işə salır, sxemi tətbiq edir və proqramı brauzerdə açır. Next.js 15, React 19 və TypeScript ilə, Prisma, Tailwind və shadcn/ui istifadə edilərək yazılıb, Playwright ilə — telefon və planşet görünüşləri də daxil — end-to-end test olunur. İnterfeys Azərbaycan dilindədir.\n\nMənbə kodu private-dır.",
      "ru": "BarKod AZ — кассовая и складская система для розничных магазинов, построенная вокруг штрихкодов: сканируй — продавай, сканируй — оприходуй. Касса печатает термочеки, поддерживает частичную оплату и долги клиентов; при приёмке товара учитываются средневзвешенная себестоимость, даты производства и срока годности, а также списания.\n\nЭтикетки печатаются на TSPL с предпросмотром на экране и штрихкодами EAN-13, распознаются весовые штрихкоды сетевых весов. Любой отчёт можно посмотреть на экране и скачать в Excel. Есть учётные записи сотрудников с ролями и PIN-защита денежных операций, а база данных автоматически резервируется каждые 24 часа без остановки работы магазина.\n\nКасса магазина — обычный ноутбук, поэтому для установки не нужен администратор БД: одна команда создаёт конфигурацию, запускает встроенный PostgreSQL, применяет схему и открывает приложение в браузере. Написано на Next.js 15, React 19 и TypeScript с Prisma, Tailwind и shadcn/ui; сквозные тесты на Playwright, включая раскладки для телефона и планшета. Интерфейс на азербайджанском.\n\nИсходный код закрыт.",
      "tr": "BarKod AZ, perakende mağazalar için barkod üzerine kurulmuş bir POS ve stok sistemidir: okut — sat, okut — stoğa al. Kasa termal fiş basar, kısmi ödemeyi ve müşteri borcunu yönetir; mal kabulünde ağırlıklı ortalama maliyet, üretim ve son kullanma tarihleri ve fireler takip edilir.\n\nEtiketler ekran önizlemesi ve EAN-13 barkodlarıyla TSPL'de basılır, ağa bağlı etiket terazisinin ağırlık barkodları tanınır. Tüm raporlar ekranda görüntülenip Excel olarak indirilebilir. Rollere sahip personel hesapları ve parayla ilgili işlemler için PIN koruması var; veritabanı her 24 saatte bir mağazayı durdurmadan otomatik yedeklenir.\n\nMağaza kasası sıradan bir dizüstü bilgisayar, bu yüzden kurulum için veritabanı yöneticisi gerekmez: tek komut yapılandırmayı oluşturur, gömülü PostgreSQL'i başlatır, şemayı uygular ve uygulamayı tarayıcıda açar. Next.js 15, React 19 ve TypeScript ile, Prisma, Tailwind ve shadcn/ui kullanılarak yazıldı; telefon ve tablet görünümleri dahil Playwright ile uçtan uca test ediliyor. Arayüz Azerbaycan Türkçesi.\n\nKaynak kodu gizlidir."
    },
    year: "2026",
    role: {
      "en": "Web app",
      "az": "Veb tətbiq",
      "ru": "Веб-приложение",
      "tr": "Web uygulaması"
    },
    cover: "assets/projects/barkod/pos-cart.jpg",
    logo: "assets/projects/barkod/logo.png",
    screenshots: [
      "assets/projects/barkod/pos-cart.jpg",
      "assets/projects/barkod/dashboard.jpg",
      "assets/projects/barkod/statistics.jpg",
      "assets/projects/barkod/stock.jpg",
      "assets/projects/barkod/sales.jpg",
      "assets/projects/barkod/reports.jpg",
      "assets/projects/barkod/scale.jpg",
      "assets/projects/barkod/login.jpg",
    ],
    tags: [
      "Next.js 15",
      "React 19",
      "PostgreSQL",
      "Prisma",
      "Playwright"
    ],
    links: {},
  },
  {
    id: "postaz",
    title: "Postaz",
    summary: {
      "en": "A fully offline, Postman-style desktop API client — collections, environments, history, cURL import — in Python, PySide6 and SQLite.",
      "az": "Tam oflayn işləyən, Postman tipli masaüstü API klienti — kolleksiyalar, mühitlər, tarixçə, cURL importu — Python, PySide6 və SQLite ilə.",
      "ru": "Полностью офлайн-клиент для API в духе Postman — коллекции, окружения, история, импорт cURL — на Python, PySide6 и SQLite.",
      "tr": "Tamamen çevrimdışı çalışan, Postman tarzı masaüstü API istemcisi — koleksiyonlar, ortamlar, geçmiş, cURL içe aktarma — Python, PySide6 ve SQLite ile."
    },
    description: {
      "en": "Postaz is a lightweight alternative to Postman that works entirely offline: no account, no cloud sync and no telemetry — one app and one SQLite file on your own disk.\n\nIt sends GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS requests with Bearer, Basic or API-key auth and JSON, raw or form bodies. Requests are kept in a tree of collections, the last 200 calls can be replayed from history, environments substitute variables such as {{baseUrl}} and {{token}} when the request is sent, and a pasted cURL command becomes a ready request. Requests run on a worker thread, so the interface never freezes.\n\nIt is written in Python with PySide6 (Qt 6), has dark and light themes and is available in English, Azerbaijani and Turkish. A Windows installer is published on GitHub and installs without administrator rights.",
      "az": "Postaz tam oflayn işləyən yüngül Postman alternatividir: hesab, bulud sinxronu və telemetriya yoxdur — öz diskinizdə bir proqram və bir SQLite faylı.\n\nGET, POST, PUT, PATCH, DELETE, HEAD və OPTIONS sorğularını Bearer, Basic və ya API açarı ilə, JSON, raw və ya form gövdəsi ilə göndərir. Sorğular kolleksiya ağacında saxlanılır, son 200 sorğunu tarixçədən təkrar göndərmək olur, mühitlər {{baseUrl}} və {{token}} kimi dəyişənləri göndərmə anında yerinə qoyur, yapışdırılan cURL əmri hazır sorğuya çevrilir. Sorğular ayrı axında işləyir, ona görə interfeys heç vaxt donmur.\n\nPython və PySide6 (Qt 6) ilə yazılıb, tünd və açıq mövzusu var, ingilis, Azərbaycan və türk dillərindədir. Windows quraşdırıcısı GitHub-da yayımlanıb və administrator hüququ olmadan quraşdırılır.",
      "ru": "Postaz — лёгкая альтернатива Postman, работающая полностью офлайн: без аккаунта, облачной синхронизации и телеметрии — одно приложение и один файл SQLite на вашем диске.\n\nОтправляет запросы GET, POST, PUT, PATCH, DELETE, HEAD и OPTIONS с авторизацией Bearer, Basic или API-ключом и телом JSON, raw или form. Запросы хранятся в дереве коллекций, последние 200 вызовов можно повторить из истории, окружения подставляют переменные вроде {{baseUrl}} и {{token}} при отправке, а вставленная команда cURL превращается в готовый запрос. Запросы выполняются в отдельном потоке, поэтому интерфейс никогда не зависает.\n\nНаписано на Python с PySide6 (Qt 6), есть тёмная и светлая темы, интерфейс на английском, азербайджанском и турецком. Установщик для Windows опубликован на GitHub и ставится без прав администратора.",
      "tr": "Postaz, tamamen çevrimdışı çalışan hafif bir Postman alternatifidir: hesap, bulut senkronizasyonu ve telemetri yok — kendi diskinizde tek bir uygulama ve tek bir SQLite dosyası.\n\nGET, POST, PUT, PATCH, DELETE, HEAD ve OPTIONS isteklerini Bearer, Basic ya da API anahtarıyla, JSON, raw ya da form gövdesiyle gönderir. İstekler koleksiyon ağacında saklanır, son 200 çağrı geçmişten yeniden gönderilebilir, ortamlar {{baseUrl}} ve {{token}} gibi değişkenleri gönderim anında yerine koyar, yapıştırılan cURL komutu hazır bir isteğe dönüşür. İstekler ayrı bir iş parçacığında çalışır, bu yüzden arayüz asla donmaz.\n\nPython ve PySide6 (Qt 6) ile yazıldı, koyu ve açık teması var; İngilizce, Azerbaycan Türkçesi ve Türkçe. Windows kurulum dosyası GitHub'da yayımlandı ve yönetici hakkı olmadan kurulur."
    },
    year: "2026",
    role: {
      "en": "Desktop app",
      "az": "Masaüstü proqram",
      "ru": "Десктопное приложение",
      "tr": "Masaüstü uygulama"
    },
    screenshots: [
      "assets/projects/postaz/request-az.png",
      "assets/projects/postaz/request-en.png"
    ],
    tags: [
      "Python",
      "PySide6",
      "Qt 6",
      "SQLite"
    ],
    links: {
      "download": "https://github.com/goshgarhasanov/postaz_api_tester/releases/latest",
      "source": "https://github.com/goshgarhasanov/postaz_api_tester"
    },
  },
  {
    id: "pixelforge-studio",
    title: "PixelForge Studio",
    summary: {
      en: "Desktop image converter, resizer and compressor with batch processing and an Azerbaijani interface — Python and CustomTkinter.",
      az: "Toplu emal imkanı olan, Azərbaycan dilində interfeysli masaüstü şəkil çevirici, ölçü dəyişdirici və sıxışdırıcı — Python və CustomTkinter.",
      ru: "Десктопный конвертер, ресайзер и компрессор изображений с пакетной обработкой и интерфейсом на азербайджанском — Python и CustomTkinter.",
      tr: "Toplu işleme destekli, Azerbaycan Türkçesi arayüzlü masaüstü görsel dönüştürücü, boyutlandırıcı ve sıkıştırıcı — Python ve CustomTkinter.",
    },
    description: {
      en: "PixelForge Studio is a desktop app for everyday image work: converting between formats, resizing and compressing — for many files at once. Images are dragged into the window or picked from a dialog; JPG, PNG, WEBP, GIF, BMP, TIFF and HEIC are supported.\n\nIn the settings panel you choose the output format, the resize mode, a target file size in kilobytes and the output folder, then process the whole queue with one click. Each file in the queue shows its size before and after and its status, and a file that fails opens an error dialog with the details. A built-in log viewer shows what the app is doing, filtered by level.\n\nIt is written in Python with a CustomTkinter interface and Pillow for image processing, the code is split into a core (converter, resizer, compressor, pipeline) and a UI layer, and the core is covered by unit and integration tests run in CI. The interface is in Azerbaijani, with English and Turkish translations.",
      az: "PixelForge Studio gündəlik şəkil işləri üçün masaüstü tətbiqidir: formatlar arasında çevirmə, ölçü dəyişmə və sıxışdırma — eyni anda çoxlu fayl üçün. Şəkillər pəncərəyə sürüklənir və ya dialoqdan seçilir; JPG, PNG, WEBP, GIF, BMP, TIFF və HEIC dəstəklənir.\n\nTənzimləmələr panelində çıxış formatını, ölçü rejimini, kilobaytla hədəf fayl ölçüsünü və çıxış qovluğunu seçib bütün növbəni bir kliklə emal edirsiniz. Növbədəki hər faylın əvvəlki və sonrakı ölçüsü və vəziyyəti görünür, alınmayan fayl üçün təfərrüatlı xəta pəncərəsi açılır. Daxili qeydlər paneli tətbiqin nə etdiyini səviyyəyə görə filtrlə göstərir.\n\nPython ilə yazılıb: interfeys CustomTkinter, şəkil emalı Pillow ilədir. Kod nüvəyə (çevirici, ölçü dəyişdirici, sıxışdırıcı, emal axını) və interfeys qatına bölünüb, nüvə CI-da işləyən unit və inteqrasiya testləri ilə yoxlanılır. İnterfeys Azərbaycan dilindədir, ingilis və türk tərcümələri də var.",
      ru: "PixelForge Studio — десктопное приложение для повседневной работы с изображениями: конвертация между форматами, изменение размера и сжатие — сразу для многих файлов. Изображения перетаскиваются в окно или выбираются в диалоге; поддерживаются JPG, PNG, WEBP, GIF, BMP, TIFF и HEIC.\n\nВ панели настроек выбираются выходной формат, режим изменения размера, целевой размер файла в килобайтах и папка вывода, после чего вся очередь обрабатывается одним нажатием. Для каждого файла в очереди виден размер до и после и статус, а при ошибке открывается окно с подробностями. Встроенный просмотрщик логов показывает работу приложения с фильтром по уровню.\n\nНаписано на Python: интерфейс на CustomTkinter, обработка изображений — Pillow. Код разделён на ядро (конвертер, ресайзер, компрессор, конвейер) и слой интерфейса, ядро покрыто юнит- и интеграционными тестами, которые запускаются в CI. Интерфейс на азербайджанском, есть переводы на английский и турецкий.",
      tr: "PixelForge Studio günlük görsel işleri için bir masaüstü uygulaması: formatlar arası dönüştürme, yeniden boyutlandırma ve sıkıştırma — aynı anda birçok dosya için. Görseller pencereye sürüklenir ya da bir iletişim kutusundan seçilir; JPG, PNG, WEBP, GIF, BMP, TIFF ve HEIC desteklenir.\n\nAyarlar panelinde çıktı formatını, boyutlandırma modunu, kilobayt cinsinden hedef dosya boyutunu ve çıktı klasörünü seçip tüm kuyruğu tek tıkla işlersiniz. Kuyruktaki her dosyanın önceki ve sonraki boyutu ile durumu görünür, başarısız olan dosya için ayrıntılı bir hata penceresi açılır. Yerleşik günlük görüntüleyici uygulamanın ne yaptığını seviyeye göre filtreleyerek gösterir.\n\nPython ile yazıldı: arayüz CustomTkinter, görsel işleme Pillow ile. Kod bir çekirdek (dönüştürücü, boyutlandırıcı, sıkıştırıcı, işlem hattı) ve arayüz katmanına ayrıldı; çekirdek CI'da çalışan birim ve entegrasyon testleriyle doğrulanıyor. Arayüz Azerbaycan Türkçesi, İngilizce ve Türkçe çevirileri de var.",
    },
    year: "2026",
    role: { en: "Desktop app", az: "Masaüstü proqram", ru: "Десктопное приложение", tr: "Masaüstü uygulama" },
    screenshots: [
      "assets/projects/pixelforge/04-results.png",
      "assets/projects/pixelforge/01-empty.png",
      "assets/projects/pixelforge/02-queue-loaded.png",
      "assets/projects/pixelforge/03-logs-active.png",
      "assets/projects/pixelforge/05-error-dialog.png",
    ],
    tags: ["Python", "CustomTkinter", "Pillow", "pytest"],
    links: {
      source: "https://github.com/goshgarhasanov/pixelforge-studio",
    },
  },
  {
    id: "manat-converter",
    title: {
      "en": "Çevir — Currency & Crypto Converter",
      "az": "Çevir — Valyuta və Kripto Çevirici",
      "ru": "Çevir — конвертер валют и криптовалют",
      "tr": "Çevir — Döviz ve Kripto Çevirici"
    },
    summary: {
      "en": "Live converter between 170+ world currencies and major cryptocurrencies, built on the Azerbaijani manat — Next.js, fully in Azerbaijani.",
      "az": "Manat əsasında 170-dən çox dünya valyutası və əsas kriptovalyutalar arasında canlı çevirici — Next.js, tam Azərbaycan dilində.",
      "ru": "Живой конвертер между 170+ мировыми валютами и основными криптовалютами на базе азербайджанского маната — Next.js, полностью на азербайджанском.",
      "tr": "Azerbaycan manatı temelli, 170'ten fazla dünya para birimi ve başlıca kripto paralar arasında canlı çevirici — Next.js, tamamen Azerbaycan Türkçesi."
    },
    description: {
      "en": "Çevir converts any amount between 170+ world currencies and major cryptocurrencies with live rates. Any currency — crypto included — can be the base, and the results update as you type.\n\nAll rates are normalised to one pivot, the Azerbaijani manat: fiat rates come from open.er-api.com and crypto prices from CoinGecko in dollars, converted to the same pivot, so converting between any two currencies is a single exact division. Up to five favourite currencies are kept for a focused view and remembered in the browser, and the full list can be searched. Each amount is also written out in words.\n\nIt is a fully static site with no backend and no API keys: Next.js 15 with static export, TypeScript and Tailwind CSS v4, deployed to GitHub Pages by GitHub Actions. The interface is mobile-first and in Azerbaijani.",
      "az": "Çevir istənilən məbləği 170-dən çox dünya valyutası və əsas kriptovalyutalar arasında canlı məzənnə ilə çevirir. İstənilən valyuta — kripto da daxil — əsas ola bilər, nəticələr yazdıqca yenilənir.\n\nBütün məzənnələr tək bir dayağa — Azərbaycan manatına gətirilir: fiat məzənnələr open.er-api.com-dan, kripto qiymətləri isə CoinGecko-dan dollarla gəlir və eyni dayağa çevrilir, ona görə istənilən iki valyuta arasında çevirmə tək dəqiq bölmədir. Diqqəti cəmləmək üçün beşə qədər seçilmiş valyuta saxlanılır və brauzerdə yadda qalır, tam siyahıda axtarış etmək olur. Hər məbləğ sözlə də yazılır.\n\nBackend-i və API açarı olmayan tam statik saytdır: statik export ilə Next.js 15, TypeScript və Tailwind CSS v4, GitHub Actions ilə GitHub Pages-ə yayımlanır. İnterfeys əvvəlcə mobil üçün düşünülüb və Azərbaycan dilindədir.",
      "ru": "Çevir пересчитывает любую сумму между 170+ мировыми валютами и основными криптовалютами по живому курсу. Базой может быть любая валюта, включая криптовалюту, а результаты обновляются по мере ввода.\n\nВсе курсы приводятся к одной опорной валюте — азербайджанскому манату: фиатные курсы берутся с open.er-api.com, цены криптовалют — с CoinGecko в долларах и переводятся к той же опоре, поэтому конвертация между любыми двумя валютами — это одно точное деление. До пяти избранных валют сохраняются в браузере для быстрого просмотра, по полному списку есть поиск. Каждая сумма также пишется прописью.\n\nПолностью статический сайт без бэкенда и API-ключей: Next.js 15 со статическим экспортом, TypeScript и Tailwind CSS v4, деплой на GitHub Pages через GitHub Actions. Интерфейс адаптирован в первую очередь под телефон и на азербайджанском.",
      "tr": "Çevir, herhangi bir tutarı 170'ten fazla dünya para birimi ve başlıca kripto paralar arasında canlı kurla çevirir. Kripto dahil her para birimi temel olabilir, sonuçlar yazdıkça güncellenir.\n\nTüm kurlar tek bir pivota — Azerbaycan manatına — getirilir: itibari kurlar open.er-api.com'dan, kripto fiyatları CoinGecko'dan dolar cinsinden gelir ve aynı pivota çevrilir; böylece iki para birimi arasındaki dönüşüm tek bir kesin bölmedir. Beşe kadar favori para birimi odaklı görünüm için tarayıcıda saklanır, tam listede arama yapılabilir. Her tutar yazıyla da gösterilir.\n\nBackend'i ve API anahtarı olmayan tamamen statik bir site: statik export ile Next.js 15, TypeScript ve Tailwind CSS v4, GitHub Actions ile GitHub Pages'e yayımlanıyor. Arayüz önce mobil düşünülerek hazırlandı ve Azerbaycan Türkçesi."
    },
    year: "2026",
    role: {
      "en": "Web app",
      "az": "Veb tətbiq",
      "ru": "Веб-приложение",
      "tr": "Web uygulaması"
    },
    screenshots: [
      "assets/projects/manat/desktop.png",
      "assets/projects/manat/mobile.png",
      "assets/projects/manat/mobile-all.png"
    ],
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions"
    ],
    links: {
      "demo": "https://goshgarhasanov.github.io/manat-converter/",
      "source": "https://github.com/goshgarhasanov/manat-converter"
    },
  },
  {
    id: "marble-shooter",
    title: "Marble Shooter",
    summary: {
      en: "A Zuma-style marble shooter for web and mobile in which every graphic and sound is generated at runtime — zero asset files.",
      az: "Veb və mobil üçün Zuma tipli şar atma oyunu: bütün qrafika və səslər işləmə zamanı yaradılır — heç bir şəkil və ya səs faylı yoxdur.",
      ru: "Шарострел в стиле Zuma для веба и мобильных: вся графика и звук создаются во время работы — ни одного файла ресурсов.",
      tr: "Web ve mobil için Zuma tarzı bilye atma oyunu: tüm grafikler ve sesler çalışma anında üretilir — tek bir varlık dosyası yok.",
    },
    description: {
      en: "A take on the Zuma genre: a frog in the middle shoots coloured marbles into a chain rolling along a spiral towards the skull, and three or more of the same colour disappear. Marbles, the stone track, the frog, particles and UI panels are drawn with the Canvas 2D API at startup, and the music and every sound effect are synthesised with the Web Audio API, so the whole game ships as a single JavaScript bundle.\n\nThe game logic does not depend on the engine: each marble stores a single number — its distance along the path — so inserting, closing gaps and chain reactions become plain arithmetic. The simulation runs headless under node:test and gameplay rules are checked by unit tests without opening a browser.\n\nThe layout is rebuilt from the real screen size rather than scaled: the spiral reshapes to the aspect ratio, and ball sizes and speeds scale with it so the game plays the same on a phone and a desktop. There are power-ups (bomb, slow, backwards, accuracy with a laser sight), gap shots, streaks, combos, coins, lives, a player profile with ten persistent statistics, and four languages.",
      az: "Zuma janrının öz versiyası: ortadakı qurbağa spiral boyunca kəlləyə doğru yuvarlanan zəncirə rəngli şarlar atır, eyni rəngdən üç və daha çox şar yan-yana gələndə partlayır. Şarlar, daş yol, qurbağa, hissəciklər və interfeys panelləri açılışda Canvas 2D API ilə çəkilir, musiqi və bütün səs effektləri Web Audio API ilə sintez olunur — oyunun hamısı tək bir JavaScript faylıdır.\n\nOyun məntiqi mühərrikdən asılı deyil: hər şar yalnız bir ədəd saxlayır — yol boyunca məsafəsini. Bu sayədə şar əlavə etmək, boşluğu bağlamaq və zəncirvari partlayışlar sadə hesaba çevrilir. Simulyasiya brauzersiz node:test altında işləyir, oyun qaydaları unit testlərlə yoxlanılır.\n\nEkran dizaynı miqyaslanmır, real ekran ölçüsünə görə yenidən qurulur: spiral ekranın nisbətinə uyğun formalaşır, şarların ölçüsü və sürəti də onunla dəyişir, ona görə oyun telefonda və kompüterdə eyni hiss olunur. Gücləndiricilər (bomba, yavaşlatma, geri hərəkət, lazer nişangahı), boşluqdan atış, seriyalar, kombolar, qəpiklər, canlar, on statistikalı oyunçu profili və dörd dil var.",
      ru: "Своя версия жанра Zuma: лягушка в центре стреляет цветными шарами в цепочку, которая катится по спирали к черепу, и три и более шара одного цвета исчезают. Шары, каменная дорожка, лягушка, частицы и панели интерфейса рисуются при запуске через Canvas 2D API, а музыка и все звуковые эффекты синтезируются через Web Audio API — вся игра поставляется одним JavaScript-файлом.\n\nИгровая логика не зависит от движка: каждый шар хранит одно число — расстояние вдоль пути, поэтому вставка, закрытие разрывов и цепные реакции сводятся к простой арифметике. Симуляция работает без браузера под node:test, правила игры проверяются юнит-тестами.\n\nРазметка не масштабируется, а строится заново по реальному размеру экрана: спираль подстраивается под соотношение сторон, размер и скорость шаров меняются вместе с ней, поэтому на телефоне и компьютере игра ощущается одинаково. Есть бонусы (бомба, замедление, движение назад, лазерный прицел), выстрелы в разрыв, серии, комбо, монеты, жизни, профиль игрока с десятью статистиками и четыре языка.",
      tr: "Zuma türünün kendi yorumu: ortadaki kurbağa, spiral boyunca kafatasına doğru yuvarlanan zincire renkli bilyeler atar; aynı renkten üç ve daha fazla bilye yan yana gelince patlar. Bilyeler, taş yol, kurbağa, parçacıklar ve arayüz panelleri açılışta Canvas 2D API ile çizilir, müzik ve tüm ses efektleri Web Audio API ile sentezlenir — oyunun tamamı tek bir JavaScript dosyasıdır.\n\nOyun mantığı motordan bağımsızdır: her bilye tek bir sayı tutar — yol boyunca mesafesini. Böylece bilye eklemek, boşluk kapatmak ve zincirleme patlamalar basit aritmetiğe dönüşür. Simülasyon tarayıcısız node:test altında çalışır, oyun kuralları birim testleriyle doğrulanır.\n\nYerleşim ölçeklenmez, gerçek ekran boyutuna göre yeniden kurulur: spiral ekran oranına göre şekillenir, bilye boyutu ve hızı da onunla değişir; oyun telefonda ve bilgisayarda aynı hissettirir. Güçlendiriciler (bomba, yavaşlatma, geri hareket, lazer nişangâh), boşluk atışları, seriler, kombolar, altınlar, canlar, on istatistikli oyuncu profili ve dört dil var.",
    },
    year: "2026",
    role: { en: "Game", az: "Oyun", ru: "Игра", tr: "Oyun" },
    screenshots: [
      "assets/projects/marble-shooter/gameplay.jpg",
      "assets/projects/marble-shooter/menu.jpg",
      "assets/projects/marble-shooter/profile.jpg",
      "assets/projects/marble-shooter/settings.jpg",
      "assets/projects/marble-shooter/name.jpg",
      "assets/projects/marble-shooter/about.jpg",
      "assets/projects/marble-shooter/mobile.jpg",
    ],
    tags: ["TypeScript", "Phaser 3", "Vite", "Web Audio", "Canvas"],
    links: {
      source: "https://github.com/goshgarhasanov/marble-shooter",
    },
  },
  {
    id: "tiko",
    title: "Tiko.az",
    summary: {
      en: "Classic tic-tac-toe with a modern look and a real AI opponent — minimax with alpha-beta pruning, four difficulty levels and five board sizes.",
      az: "Müasir görkəmli klassik X-O oyunu və əsl AI rəqib — alpha-beta budamalı minimax, dörd çətinlik səviyyəsi və beş lövhə ölçüsü.",
      ru: "Классические крестики-нолики в современном виде с настоящим ИИ-соперником — минимакс с альфа-бета отсечением, четыре уровня сложности и пять размеров поля.",
      tr: "Modern görünümlü klasik XOX ve gerçek bir yapay zekâ rakip — alfa-beta budamalı minimax, dört zorluk seviyesi ve beş tahta boyutu.",
    },
    description: {
      en: "A polished, modern version of tic-tac-toe (X-O) built with pure HTML, CSS and vanilla JavaScript — no frameworks and no build step.\n\nThe computer opponent uses minimax with alpha-beta pruning, so on the hardest level it plays perfectly and cannot be beaten; the easier levels make deliberate mistakes. Besides the classic 3×3 there are four larger board sizes, three visual skins, undo / redo, and statistics of wins, losses and draws saved in the browser.\n\nThe interface is mobile-first and responsive, and the game installs as a PWA and works offline. A small test suite covers the game logic.",
      az: "Saf HTML, CSS və vanilla JavaScript ilə yazılmış, müasir və səliqəli X-O oyunu — heç bir framework və build mərhələsi yoxdur.\n\nKompüter rəqib alpha-beta budamalı minimax alqoritmindən istifadə edir, ona görə ən çətin səviyyədə səhvsiz oynayır və onu udmaq mümkün deyil; asan səviyyələr isə qəsdən səhv edir. Klassik 3×3-dən başqa dörd böyük lövhə ölçüsü, üç vizual skin, geri / irəli addım və brauzerdə saxlanan qələbə, məğlubiyyət və heç-heçə statistikası var.\n\nİnterfeys əvvəlcə mobil üçün düşünülüb və responsivdir, oyun PWA kimi quraşdırılır və internetsiz işləyir. Oyun məntiqi kiçik test dəsti ilə yoxlanılır.",
      ru: "Аккуратная современная версия крестиков-ноликов на чистом HTML, CSS и JavaScript — без фреймворков и сборки.\n\nКомпьютерный соперник использует минимакс с альфа-бета отсечением, поэтому на самом сложном уровне играет безошибочно и его невозможно обыграть; на лёгких уровнях он намеренно ошибается. Помимо классического 3×3 есть четыре больших размера поля, три скина, отмена / повтор хода и статистика побед, поражений и ничьих, которая хранится в браузере.\n\nИнтерфейс адаптивный и сделан в первую очередь для телефона, игра устанавливается как PWA и работает офлайн. Логику игры проверяет небольшой набор тестов.",
      tr: "Saf HTML, CSS ve vanilla JavaScript ile yazılmış, modern ve özenli bir XOX — framework yok, derleme adımı yok.\n\nBilgisayar rakip alfa-beta budamalı minimax kullanır; en zor seviyede hatasız oynar ve yenilemez, kolay seviyelerde ise bilerek hata yapar. Klasik 3×3'ün yanında dört büyük tahta boyutu, üç görsel tema, geri al / ileri al ve tarayıcıda saklanan galibiyet, mağlubiyet ve beraberlik istatistikleri var.\n\nArayüz önce mobil düşünülerek hazırlandı ve duyarlı; oyun PWA olarak kurulur ve çevrimdışı çalışır. Oyun mantığını küçük bir test paketi doğrular.",
    },
    year: "2026",
    role: { en: "Game", az: "Oyun", ru: "Игра", tr: "Oyun" },
    screenshots: [
      "assets/projects/tiko/03-midgame.png",
      "assets/projects/tiko/01-main.png",
      "assets/projects/tiko/02-menu.png",
      "assets/projects/tiko/04-win.png",
      "assets/projects/tiko/05-stats.png",
      "assets/projects/tiko/06-mobile-menu.png",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "PWA", "Minimax AI"],
    links: {
      demo: "https://goshgarhasanov.github.io/tiko.az/",
      source: "https://github.com/goshgarhasanov/tiko.az",
    },
  },
  {
    id: "dino-qacis",
    title: "DinoGame.Az",
    summary: {
      en: "A polished, fully responsive remake of Chrome's offline dinosaur game in pure HTML, CSS and JavaScript — play it in the browser.",
      az: "Chrome-un internetsiz dinozavr oyununun saf HTML, CSS və JavaScript ilə yazılmış, tam responsiv yeni versiyası — brauzerdə oynamaq olar.",
      ru: "Аккуратный адаптивный ремейк офлайн-игры про динозавра из Chrome на чистом HTML, CSS и JavaScript — играйте прямо в браузере.",
      tr: "Chrome'un çevrimdışı dinozor oyununun saf HTML, CSS ve JavaScript ile yazılmış, tamamen duyarlı yeni sürümü — tarayıcıda oynanır.",
    },
    description: {
      en: "DinoGame.Az recreates the well-known Chrome \"no internet\" dinosaur runner as a modern browser game, written in pure HTML, CSS and vanilla JavaScript with no dependencies and no build step.\n\nThe dinosaur jumps and ducks to dodge cacti and birds, the speed rises as the score climbs, and the best score is saved. It is played with the keyboard on a desktop and with tap controls on a phone, and the layout adapts to any screen size. The interface is in Azerbaijani.",
      az: "DinoGame.Az Chrome-un tanınmış \"internet yoxdur\" dinozavr oyununu müasir brauzer oyunu kimi yenidən yaradır — saf HTML, CSS və vanilla JavaScript ilə, heç bir asılılıq və build mərhələsi olmadan.\n\nDinozavr kaktuslardan və quşlardan qaçmaq üçün tullanır və əyilir, xal artdıqca sürət də artır, ən yaxşı nəticə yadda saxlanılır. Kompüterdə klaviatura ilə, telefonda toxunuşla oynanılır, dizayn istənilən ekran ölçüsünə uyğunlaşır. İnterfeys Azərbaycan dilindədir.",
      ru: "DinoGame.Az воссоздаёт известную игру Chrome про динозавра «нет подключения к интернету» как современную браузерную игру — на чистом HTML, CSS и JavaScript, без зависимостей и сборки.\n\nДинозавр прыгает и пригибается, уворачиваясь от кактусов и птиц, скорость растёт вместе со счётом, лучший результат сохраняется. На компьютере играют с клавиатуры, на телефоне — касаниями, вёрстка подстраивается под любой экран. Интерфейс на азербайджанском.",
      tr: "DinoGame.Az, Chrome'un bilinen \"internet yok\" dinozor oyununu modern bir tarayıcı oyunu olarak yeniden yaratıyor — saf HTML, CSS ve vanilla JavaScript ile, bağımlılık ve derleme adımı olmadan.\n\nDinozor kaktüslerden ve kuşlardan kaçmak için zıplar ve eğilir, puan arttıkça hız da artar, en iyi skor saklanır. Bilgisayarda klavyeyle, telefonda dokunarak oynanır ve tasarım her ekran boyutuna uyar. Arayüz Azerbaycan Türkçesi.",
    },
    year: "2026",
    role: { en: "Game", az: "Oyun", ru: "Игра", tr: "Oyun" },
    screenshots: [
      "assets/projects/dino-qacis/desktop-play.png",
      "assets/projects/dino-qacis/desktop-hero.png",
      "assets/projects/dino-qacis/desktop-jump.png",
      "assets/projects/dino-qacis/mobile-hero.png",
      "assets/projects/dino-qacis/mobile-play.png",
      "assets/projects/dino-qacis/mobile-jump.png",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Canvas"],
    links: {
      demo: "https://goshgarhasanov.github.io/dino-qacis/",
      source: "https://github.com/goshgarhasanov/dino-qacis",
    },
  },
  {
    id: "snake-az",
    title: "SnakeGame.Az",
    summary: {
      en: "A modern, neon-styled Snake game in pure HTML, CSS and JavaScript — smooth on desktop and on touch screens.",
      az: "Saf HTML, CSS və JavaScript ilə yazılmış müasir, neon üslublu İlan oyunu — kompüterdə də, toxunma ekranlarında da rahat oynanılır.",
      ru: "Современная «Змейка» в неоновом стиле на чистом HTML, CSS и JavaScript — плавно работает и на компьютере, и на сенсорных экранах.",
      tr: "Saf HTML, CSS ve JavaScript ile yazılmış modern, neon tarzı Yılan oyunu — bilgisayarda da dokunmatik ekranlarda da akıcı.",
    },
    description: {
      en: "SnakeGame.Az is a clean, neon-themed version of the timeless Snake game, drawn on an HTML5 canvas with no frameworks, no dependencies and no build step.\n\nThe game loop is frame-rate independent, so the snake moves at the same speed on any screen refresh rate. On a desktop it is played with the arrow keys or WASD, on a phone with swipes or on-screen buttons, and the layout adapts to any screen. The score and a persistent high score are tracked, there are sound effects, and the code is split into separate modules for game logic, rendering, input, audio and UI.",
      az: "SnakeGame.Az — klassik İlan oyununun səliqəli, neon üslublu versiyasıdır; HTML5 canvas üzərində çəkilir, heç bir framework, asılılıq və build mərhələsi yoxdur.\n\nOyun dövrü kadr tezliyindən asılı deyil, ona görə ilan istənilən ekranda eyni sürətlə hərəkət edir. Kompüterdə ox düymələri və ya WASD ilə, telefonda sürüşdürmə və ya ekran düymələri ilə oynanılır, dizayn istənilən ekrana uyğunlaşır. Xal və yadda qalan rekord izlənir, səs effektləri var; kod oyun məntiqi, çəkmə, idarəetmə, səs və interfeys üçün ayrı modullara bölünüb.",
      ru: "SnakeGame.Az — аккуратная неоновая версия классической «Змейки», нарисованная на HTML5 canvas без фреймворков, зависимостей и сборки.\n\nИгровой цикл не зависит от частоты кадров, поэтому змейка движется с одной скоростью на любом экране. На компьютере играют стрелками или WASD, на телефоне — свайпами или экранными кнопками, вёрстка подстраивается под любой экран. Ведётся счёт и сохраняется рекорд, есть звуковые эффекты, а код разделён на модули логики, отрисовки, управления, звука и интерфейса.",
      tr: "SnakeGame.Az, klasik Yılan oyununun sade, neon temalı bir sürümü; HTML5 canvas üzerinde çiziliyor, framework, bağımlılık ve derleme adımı yok.\n\nOyun döngüsü kare hızından bağımsız, bu yüzden yılan her ekranda aynı hızla hareket ediyor. Bilgisayarda ok tuşları ya da WASD ile, telefonda kaydırarak ya da ekran düğmeleriyle oynanır ve tasarım her ekrana uyar. Puan ve kalıcı rekor tutulur, ses efektleri var; kod oyun mantığı, çizim, kontrol, ses ve arayüz için ayrı modüllere bölünmüş.",
    },
    year: "2026",
    role: { en: "Game", az: "Oyun", ru: "Игра", tr: "Oyun" },
    screenshots: [
      "assets/projects/snake/desktop-action.png",
      "assets/projects/snake/desktop-hero.png",
      "assets/projects/snake/desktop-play.png",
      "assets/projects/snake/mobile-hero.png",
      "assets/projects/snake/mobile-play.png",
      "assets/projects/snake/mobile-action.png",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Canvas"],
    links: {
      demo: "https://goshgarhasanov.github.io/snake-az/",
      source: "https://github.com/goshgarhasanov/snake-az",
    },
  },
  {
    id: "pong",
    title: "Pong.az",
    summary: {
      en: "A neon-dark take on classic Pong with a predictive AI opponent, particle sparks, screen shake and synthesised Web Audio sound.",
      az: "Klassik Pong-un neon-tünd versiyası: topun yolunu qabaqcadan hesablayan AI rəqib, qığılcımlar, ekran titrəməsi və Web Audio ilə sintez olunan səslər.",
      ru: "Неоново-тёмная версия классического Pong: ИИ-соперник, просчитывающий траекторию мяча, искры, тряска экрана и синтезированный звук Web Audio.",
      tr: "Klasik Pong'un neon-karanlık yorumu: topun yolunu önceden hesaplayan yapay zekâ rakip, kıvılcımlar, ekran sarsıntısı ve Web Audio ile sentezlenen sesler.",
    },
    description: {
      en: "Pong.az is a modern, neon-styled reimagining of the arcade classic, built with an HTML5 canvas, CSS and vanilla JavaScript — no frameworks and no build step.\n\nThe computer opponent does not simply chase the ball: it predicts the ball's path, including bounces off the walls, and moves to where the ball will arrive. Hits throw off particle sparks, a goal shakes the screen, and every sound effect is synthesised with the Web Audio API, so there are no audio files. The paddle is moved with the mouse, a finger or the arrow keys, and the target score and other options are set in the settings.\n\nIt works on desktop and mobile, installs as a PWA and runs offline.",
      az: "Pong.az — arkada klassikasının müasir, neon üslublu yeni versiyasıdır; HTML5 canvas, CSS və vanilla JavaScript ilə yazılıb, heç bir framework və build mərhələsi yoxdur.\n\nKompüter rəqib sadəcə topun arxasınca qaçmır: topun divarlardan sıçrayışları ilə birlikdə yolunu qabaqcadan hesablayır və top gələcək yerə hərəkət edir. Zərbələrdən qığılcımlar qopur, qol vurulanda ekran titrəyir, bütün səs effektləri Web Audio API ilə sintez olunur — heç bir səs faylı yoxdur. Raket siçan, barmaq və ya ox düymələri ilə idarə olunur, hədəf xal və digər seçimlər ayarlardan təyin edilir.\n\nKompüterdə və mobildə işləyir, PWA kimi quraşdırılır və internetsiz açılır.",
      ru: "Pong.az — современная неоновая версия аркадной классики на HTML5 canvas, CSS и чистом JavaScript, без фреймворков и сборки.\n\nКомпьютерный соперник не просто гонится за мячом: он заранее просчитывает траекторию с учётом отскоков от стен и выходит туда, куда мяч прилетит. От ударов летят искры, при голе трясётся экран, а все звуки синтезируются через Web Audio API — без аудиофайлов. Ракеткой управляют мышью, пальцем или стрелками, целевой счёт и другие опции задаются в настройках.\n\nРаботает на компьютере и телефоне, устанавливается как PWA и запускается офлайн.",
      tr: "Pong.az, atari klasiğinin modern, neon tarzı yeniden yorumu; HTML5 canvas, CSS ve vanilla JavaScript ile yazıldı, framework ve derleme adımı yok.\n\nBilgisayar rakip topu yalnızca kovalamaz: duvarlardan sekmeleriyle birlikte topun yolunu önceden hesaplar ve topun geleceği yere gider. Vuruşlarda kıvılcımlar saçılır, gol olunca ekran sarsılır ve tüm ses efektleri Web Audio API ile sentezlenir — hiç ses dosyası yok. Raket fare, parmak ya da ok tuşlarıyla kontrol edilir; hedef skor ve diğer seçenekler ayarlardan belirlenir.\n\nBilgisayarda ve mobilde çalışır, PWA olarak kurulur ve çevrimdışı açılır.",
    },
    year: "2026",
    role: { en: "Game", az: "Oyun", ru: "Игра", tr: "Oyun" },
    screenshots: [
      "assets/projects/pong/03-play.png",
      "assets/projects/pong/01-menu.png",
      "assets/projects/pong/02-settings.png",
      "assets/projects/pong/04-mobile.png",
    ],
    tags: ["JavaScript", "Canvas", "Web Audio", "PWA"],
    links: {
      demo: "https://goshgarhasanov.github.io/pong.az/",
      source: "https://github.com/goshgarhasanov/pong.az",
    },
  },
  {
    id: "udolor-az",
    title: "Udolor AZ",
    summary: {
      en: "Cross-platform Electron desktop app for downloading enrolled Udemy courses for offline viewing, with an Azerbaijani interface.",
      az: "Qeydiyyatdan keçdiyiniz Udemy kurslarını oflayn baxmaq üçün yükləyən, Azərbaycan dilində interfeysi olan Electron masaüstü tətbiqi.",
      ru: "Кроссплатформенное десктоп-приложение на Electron для загрузки своих курсов Udemy для офлайн-просмотра, с интерфейсом на азербайджанском.",
      tr: "Kayıtlı olduğunuz Udemy kurslarını çevrimdışı izlemek için indiren, Azerbaycan Türkçesi arayüzlü Electron masaüstü uygulaması.",
    },
    description: {
      en: "Udolor AZ is a desktop app for Windows, macOS and Linux that downloads the videos of the Udemy courses you are enrolled in so you can watch them offline. You sign in with your Udemy account or a login token, pick a course and choose the download options.\n\nIt is built on the open-source Udeler / udemy-downloader-gui project. I translated the whole interface into Azerbaijani, gave it a new glassmorphism design and added a script that keeps the language files in sync.\n\nIt is meant only for personal, offline use of courses you have legitimately bought or enrolled in, in line with Udemy's terms and the instructors' copyright.",
      az: "Udolor AZ — qeydiyyatdan keçdiyiniz Udemy kurslarının videolarını oflayn baxmaq üçün yükləyən, Windows, macOS və Linux-da işləyən masaüstü tətbiqidir. Udemy hesabınızla və ya giriş tokeni ilə daxil olur, kursu seçir və yükləmə ayarlarını təyin edirsiniz.\n\nAçıq mənbəli Udeler / udemy-downloader-gui layihəsi əsasında qurulub. Bütün interfeysi Azərbaycan dilinə tərcümə etdim, ona yeni glassmorphism dizaynı verdim və dil fayllarını sinxron saxlayan skript əlavə etdim.\n\nYalnız qanuni yolla aldığınız və ya qeydiyyatdan keçdiyiniz kursların şəxsi, oflayn istifadəsi üçündür — Udemy-nin qaydalarına və müəlliflərin hüquqlarına hörmətlə.",
      ru: "Udolor AZ — десктоп-приложение для Windows, macOS и Linux, которое скачивает видео курсов Udemy, на которые вы записаны, для просмотра офлайн. Вы входите через аккаунт Udemy или токен, выбираете курс и настройки загрузки.\n\nПриложение основано на open-source проекте Udeler / udemy-downloader-gui. Я перевёл весь интерфейс на азербайджанский, сделал новый дизайн в стиле glassmorphism и добавил скрипт, который синхронизирует языковые файлы.\n\nПредназначено только для личного офлайн-просмотра курсов, купленных или доступных вам законно, с уважением к правилам Udemy и авторским правам преподавателей.",
      tr: "Udolor AZ, kayıtlı olduğunuz Udemy kurslarının videolarını çevrimdışı izlemek için indiren, Windows, macOS ve Linux'ta çalışan bir masaüstü uygulamasıdır. Udemy hesabınızla ya da giriş token'ı ile oturum açar, kursu seçer ve indirme ayarlarını belirlersiniz.\n\nAçık kaynaklı Udeler / udemy-downloader-gui projesi üzerine kuruldu. Tüm arayüzü Azerbaycan Türkçesine çevirdim, ona yeni bir glassmorphism tasarımı verdim ve dil dosyalarını senkron tutan bir betik ekledim.\n\nYalnızca yasal olarak satın aldığınız ya da kayıtlı olduğunuz kursların kişisel, çevrimdışı kullanımı içindir — Udemy kurallarına ve eğitmenlerin telif haklarına saygıyla.",
    },
    year: "2026",
    role: { en: "Desktop app", az: "Masaüstü proqram", ru: "Десктопное приложение", tr: "Masaüstü uygulama" },
    logo: "assets/projects/udolor/logo.png",
    tags: ["Electron", "JavaScript", "Node.js", "i18n"],
    links: {
      source: "https://github.com/goshgarhasanov/udolor_az",
    },
  },
];
