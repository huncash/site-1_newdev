---
title: "Mit tud és mit nem tud a Matterport BIM-alapadatként? Pontosság, E57, IFC és a geodéziai ellenőrző mérés"
seoTitle: "Matterport BIM pontosság: mire jó, mire nem"
description: "A Matterport gyors, bejárható rögzítést ad, de az ÉKM rendelet geodéziai ellenőrzést és IFC leadást vár. Őszinte összefoglaló arról, mire jó és mire nem."
date: 2026-10-24
time: "18:00"
author: VRGO
category: "Tervezők, BIM-esek"
keywords: "Matterport BIM pontosság, E57, IFC, geodéziai ellenőrző mérés"
image: /blog/bim/scan-to-bim-gepeszet.jpg
imageAlt: "Gépészeti helyiség pontfelhőből készült háromdimenziós modellje."
imageCaption: "Pontfelhőből modellezett gépészeti helyiség. Illusztráció egy egyetemi kutatási példáról, nem magyar közbeszerzési projektről."
imageAuthor: Oregon State University
imageSourceUrl: https://commons.wikimedia.org/wiki/File:Scan-to-BIM_Mechanical_Room.jpg
imageLicense: CC BY-SA 2.0
imageLicenseUrl: https://creativecommons.org/licenses/by-sa/2.0
---

Matterport rendszert is használunk. Nem minden feladatra ez a megfelelő módszer, és az állami BIM-projekteknél a határt az EIR pontossági igénye húzza meg. A meglévő épületek 2035-ös határidejéről a [2. cikk](/cikkek/meglevo-allami-epuletek-bim-2035), az EIR pontossági szintjéről a [3. cikk](/cikkek/eir-pre-bep-bep) szól. A gyakorlati lépések: [pontosság és formátumok](/pontossag-es-formatumok).

## Amit a rendelet kér

- A megvalósulási dokumentációt **digitális geodéziai felmérések ellenőrző mérései alapján** készített műszaki tervdokumentáció keretében kell elkészíteni, és a CDE-ben rögzíteni (11. § (2)).
- A fejlettségi és pontossági szinteket az EIR rögzíti, modell elemek szintjén (11. § (3)).
- A leadott adatállomány IFC, BCF és natív formátumokat tartalmaz (20. § (2)).

## Amit a Matterport ad

- Gyors, teljes körű, bejárható rögzítést.
- Exportokat (a Matterport csomagjában E57 pontfelhő, OBJ, XYZ, alaprajz).
- A gyártó saját scan-to-BIM szolgáltatást is kínál, amely IFC, RVT vagy DWG fájlokat állít elő. *A szolgáltatás magyarországi elérhetőségét a megrendelés előtt ellenőrizni kell.*

## Mire jó, és mire nem?

| Feladat | Matterport | Megjegyzés |
| --- | --- | --- |
| Meglévő állapot gyors rögzítése (010) | Jól használható | a pontossági szintet az EIR-hez kell mérni |
| Falzárás előtti dokumentálás | Nagyon jó | gyors, időbélyegzett |
| Kivitelezési előrehaladás követése (150) | Jó | ismételt felvételekkel |
| Üzemeltetési digitális iker, hibajegyek (200) | Jó | Mattertag, hozzáférési szintek |
| Geodéziai ellenőrző mérés (ellenőrzőpontok, bekötés) | **Nem helyettesíti** | földmérői bekötés és mérési dokumentáció kell |
| IFC modell közvetlenül | **Nem közvetlen** | modellezés szükséges a pontfelhőből |

## Hogyan lesz belőle az EIR által kért adatállomány?

1. Rögzítés Matterporttal (és szükség esetén kiegészítő geodéziai mérés).
2. Pontfelhő (E57) feldolgozása.
3. Szakági modellezés Revitben vagy ArchiCAD-ben.
4. IFC, BCF és natív formátum leadása az EIR szerint.

A kivitelezés közbeni rögzítésről a [dokumentálási cikk](/cikkek/kivitelezes-dokumentalasa-bim) ír.

## Ajánlati szintek

Gyors felmérés, standard, pontos. A szintet a feladat pontossági igénye és az EIR határozza meg; ezt az ajánlat előtt közösen tisztázzuk. A szintekhez tartozó eltérést és feldolgozási időt csak az összehasonlító mérés után közöljük.

## Mikor ajánlunk más módszert

Földmérői ellenőrző mérés, drón, ha a feladat pontossági osztálya vagy a bekötés ezt kéri.

## Geodéziai ellenőrző mérés

A szkennelés nem helyettesíti a 11. § (2) szerinti geodéziai ellenőrző mérést. Ha a megrendelőnek nincs saját földmérője, tudunk földmérőt ajánlani, és a mérést vele projekt alapon együtt végezni.

## Kapcsolódó

- [Meglévő állami épületek, 2035](/cikkek/meglevo-allami-epuletek-bim-2035)
- [EIR, pre-BEP, BEP](/cikkek/eir-pre-bep-bep)
- [Kivitelezés dokumentálása](/cikkek/kivitelezes-dokumentalasa-bim)
- [Pontosság és formátumok](/pontossag-es-formatumok)

> *A cikk általános tájékoztatás, nem jogi tanácsadás. A hivatkozott szabályozás szövege: 31/2024. (VIII. 22.) ÉKM rendelet ([njt.jog.gov.hu](https://njt.jog.gov.hu/jogszabaly/2024-31-20-8X)). Konkrét projektnél mindig az adott közbeszerzés EIR dokumentációja és a szerződés az irányadó.*
