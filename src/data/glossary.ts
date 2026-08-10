// Bővíthető szakkifejezés-szótár.
// Új szót hozzáadni = egy sor az alábbi objektumba.
// Használat: <Term k="OTA">OTA-leírás</Term>

export const glossary = {
  OTA: "Online Travel Agency — online szállásfoglaló portál (pl. Booking.com, Expedia, Airbnb). A vendég csak fotót és rövid leírást lát.",
  BIM: "Building Information Modeling — épület-információs modell, a tervezés, kivitelezés és üzemeltetés közös digitális adatmodellje.",
  FM: "Facility Management — létesítménygazdálkodás, az épületek napi műszaki és szolgáltatási üzemeltetése.",
  ESG: "Environmental, Social, Governance — fenntarthatósági és felelős vállalatirányítási jelentési keretrendszer.",
  "as-built": "Megvalósulási dokumentáció — a ténylegesen kivitelezett állapot rögzítése (szemben a tervezett állapottal).",
  IoT: "Internet of Things — szenzorokkal, hálózatra kötött eszközökkel folyamatosan adatot gyűjtő rendszer.",
  MRR: "Monthly Recurring Revenue — havi ismétlődő bevétel, jellemzően előfizetéses díjból.",
  "egyesitett-tura":
    "Több, külön rögzített Matterport-szken egyetlen, folytonosan bejárható túrává történő összeillesztése — kampusz- és ipari léptékhez. Több hektárnyi terület vagy különálló épületek egyetlen URL alatt.",
  CAPEX: "Capital Expenditure — egyszeri beruházási költség.",
  OPEX: "Operating Expenditure — folyamatos működési költség.",
  "digitális iker":
    "Digital twin — egy fizikai épület vagy telephely élő, folyamatosan frissíthető 3D mása, amelyhez mérési adat, dokumentáció, IoT-szenzor, karbantartási és audit-előzmény köthető. Több, mint egy 3D virtuális túra.",
  Mattertag:
    "Interaktív infópont a Matterport-modellben — szöveg, fotó, PDF, link vagy videó köthető egy konkrét térponthoz (pl. tűzcsap, mérőóra, hibajegy).",
  MatterPak:
    "Matterport-export csomag (E57 pontfelhő, OBJ mesh, XYZ, méretezett alaprajz) — BIM-koordinációhoz, as-built dokumentációhoz, generálkivitelezőnek.",
  CMMS:
    "Computerized Maintenance Management System — karbantartás-koordinációs szoftver (hibajegy, planned maintenance, eszközleltár). A digitális ikerből hivatkozható, vagy fordítva.",
  "Property Intelligence":
    "Ingatlanportfólió-szintű döntéstámogató adatréteg a digitális iker fölött — bérbeadási, karbantartási, energetikai, akadálymentesítési és káresemény-KPI-k egy nézetben.",
  "Defects AI":
    "Gépi képi elemzés a Matterport-szkenek fölött — kivitelezési hibák, eltérések, hiányzó elemek automatikus felismerése időbélyegzett vizuális bizonyítékkal.",
  QM:
    "Quality Management — minőségbiztosítási folyamat. Digitális ikerre építve: ütemezett szken-körök, eltéréselemzés, audit-trail, jegyzőkönyv-export.",
} as const;

export type GlossaryKey = keyof typeof glossary;
