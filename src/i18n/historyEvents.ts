import { CHURCH_HISTORY_MILESTONES } from '../lib/history'
import type { LangId } from './types'

type EventCopy = { date: string; text: string }

const tl: EventCopy[] = [
  {
    date: 'Nob. 01, 2001',
    text: 'Unang Bible study sa tahanan nina Sammy at Charity Odasco, Romeoville, IL',
  },
  {
    date: 'Okt. 26, 2003',
    text: 'Commissioning service na ginanap sa Fil-American Baptist Church, Chicago',
  },
  {
    date: 'Nob. 09, 2003',
    text: 'Unang pagsamba bilang daughter church na sinugo mula sa Fil-American Baptist Church, ginanap sa Ramada Limited Hotel, Bolingbrook',
  },
  {
    date: 'Set. 2004',
    text: 'Tinanggap ang pangalang Pillar of Faith Baptist Fellowship (PFBF)',
  },
  {
    date: 'Nob. 27, 2005',
    text: 'Lumipat ang PFBF sa Book Road Baptist Church, Naperville, IL',
  },
  {
    date: 'Hul. 2007',
    text: 'Unang gawaing misyon sa Alangalang, Leyte, kasama ang New Life Baptist Church ng Tacloban City, Leyte (Pastor Ed Rayos, Pastor Ely Haligado, Pastor Edilberto Nasayao)',
  },
  {
    date: 'Hunyo 2–4, 2009',
    text: 'Unang Evangelistic Medical-Dental Missions sa Alangalang, Leyte, kasama ang Fil-American Baptist Church',
  },
  {
    date: 'Set. 2009',
    text: 'Nagsimula ang ministeryo sa Heritage Woods Assisted Living Facility sa Bolingbrook kasama ang First Baptist Church of Lockport; sumali pagkatapos ang Fil-American Baptist Church sa outreach na ito sa nursing home sa southwest suburbs',
  },
  {
    date: 'Hunyo 24, 2012',
    text: 'Pagpapalit ng pangalan sa Pillar of Faith Baptist Church (PFBC) at pagtanggap ng church covenant, constitution, at by-laws',
  },
  {
    date: 'Abr. 07, 2013',
    text: 'Unang halalan ng mga opisyal ng church',
  },
  {
    date: 'Marso 2014',
    text: 'Nagsimula ang Junior/Children’s church',
  },
  {
    date: 'Abril 2014',
    text: 'Kinilala ang PFBC bilang kasapi ng IL-MO ARBC (Illinois-Missouri Association of Regular Baptist Churches)',
  },
  {
    date: 'Hunyo 2014',
    text: 'Kinilala ang PFBC bilang kasapi ng GARBC (General Association of Regular Baptist Churches)',
  },
  {
    date: 'Okt. 2014',
    text: 'Nagsimula ang ministeryo sa Alden Gardens of Waterford Assisted Living',
  },
  {
    date: 'Ene. 2016',
    text: 'Nagsimula ang gawaing misyon sa Sta. Barbara at Duenas, Iloilo, Pilipinas, kasama sina Pastor Ernesto Gallinero at Pastor Freddie Ardiente ng Lighthouse Fundamental Baptist Church',
  },
  {
    date: 'Hul. 30, 2017',
    text: 'Pagsasama sa Book Road Baptist Church, at si Pastor Brad Blissett ay naging Associate Pastor; nagpatuloy ang suporta sa misyonero para kina Pastor Bill at Tamra Branks (Michigan) at Pastor Chris at Maylin Hartwick (Hong Kong)',
  },
  {
    date: 'Ene. 2018',
    text: 'Inilunsad ang gawaing misyon sa Dumangas, Iloilo, kasama si Pastor Glenn Pacquiao ng Patlad Fundamental Baptist Church',
  },
  {
    date: 'Hunyo 2018',
    text: 'Nadagdag ang ministeryo ng misyon: The Journey kasama si Pastor Jogli Tupas, na nakatuon sa mga komunidad na Muslim sa Sabah, Malaysia, at sa Southern Mindanao, Pilipinas',
  },
  {
    date: 'Set. 21, 2018',
    text: 'Legal na pagpapalit ng pangalan mula Book Rd Baptist Church tungo sa Pillar of Faith Baptist Church',
  },
  {
    date: 'Marso 2020',
    text: 'Huminto ang personal na pagtitipon noong pandemya ng COVID-19; nagpatuloy ang pagsamba tuwing Linggo online (Facebook Live) kasama ang lingguhang Zoom prayer meeting',
  },
  {
    date: 'Enero 2022',
    text: 'Nakipagtulungan sa iba’t ibang Gospel Radio Ministries sa rehiyon ng Visayas, Pilipinas',
  },
  {
    date: 'Okt. 08, 2022',
    text: 'Nagsimula ang ministeryo sa Alden Estates of Naperville Nursing Home',
  },
  {
    date: 'Okt. 2023',
    text: 'Nagsimulang suportahan ang outreach ng misyon sa Moalboal, Cebu, Pilipinas, kasama si Pastor Jimmy Inventor',
  },
  {
    date: 'Hunyo 2024',
    text: 'Pakikipagtulungan sa ministeryo ng Ebanghelyo sa mga komunidad na Muslim kasama si Pastor Earl Magdale ng Mindanao Frontier Missions Partnership Inc, Midsayap, Cotabato, Pilipinas',
  },
  {
    date: 'Peb. 01, 2026',
    text: 'Paglipat ng pastoral na pamumuno; nagsimulang maglingkod si Pastor Kris Paolo Akut bilang bagong lead pastor',
  },
  {
    date: 'Hunyo 2026',
    text: 'Matapos ang 22 taon ng tapat na paglilingkod bilang Lead Pastor, nagretiro si Pastor Ruel Akut kasunod ng anim na buwang sabbatical',
  },
  {
    date: 'Ago. 16, 2026',
    text: 'Installation service para kay Pastor Kris Paolo Akut bilang lead pastor ng Pillar of Faith Baptist Church',
  },
  {
    date: 'Ago. 23, 2026',
    text: 'Commissioning service para kay Pastor Ruel Akut bilang presidente ng Doane Baptist Bible Institute (DBBI), Iloilo City, Pilipinas',
  },
  {
    date: 'Set. 2026',
    text: 'Nakipagtulungan kay Pastor Ruel Akut upang suportahan ang ministeryo at misyon ng Doane Baptist Bible Institute (DBBI)',
  },
]

const ceb: EventCopy[] = [
  {
    date: 'Nob. 01, 2001',
    text: 'Unang Bible study sa balay nila ni Sammy ug Charity Odasco, Romeoville, IL',
  },
  {
    date: 'Okt. 26, 2003',
    text: 'Commissioning service nga gihimo sa Fil-American Baptist Church, Chicago',
  },
  {
    date: 'Nob. 09, 2003',
    text: 'Unang pagsimba isip daughter church nga gipadala gikan sa Fil-American Baptist Church, gihimo sa Ramada Limited Hotel, Bolingbrook',
  },
  {
    date: 'Sep. 2004',
    text: 'Gidawat ang ngalang Pillar of Faith Baptist Fellowship (PFBF)',
  },
  {
    date: 'Nob. 27, 2005',
    text: 'Mibalhin ang PFBF sa Book Road Baptist Church, Naperville, IL',
  },
  {
    date: 'Hul. 2007',
    text: 'Unang buhat sa misyon sa Alangalang, Leyte, kauban ang New Life Baptist Church sa Tacloban City, Leyte (Pastor Ed Rayos, Pastor Ely Haligado, Pastor Edilberto Nasayao)',
  },
  {
    date: 'Hunyo 2–4, 2009',
    text: 'Unang Evangelistic Medical-Dental Missions sa Alangalang, Leyte, kauban ang Fil-American Baptist Church',
  },
  {
    date: 'Sep. 2009',
    text: 'Nagsugod ang ministeryo sa Heritage Woods Assisted Living Facility sa Bolingbrook kauban ang First Baptist Church of Lockport; miapil unya ang Fil-American Baptist Church niining outreach sa nursing home sa southwest suburbs',
  },
  {
    date: 'Hunyo 24, 2012',
    text: 'Pag-ilis sa ngalan ngadto sa Pillar of Faith Baptist Church (PFBC) ug pagdawat sa church covenant, constitution, ug by-laws',
  },
  {
    date: 'Abr. 07, 2013',
    text: 'Unang eleksyon sa mga opisyal sa church',
  },
  {
    date: 'Marso 2014',
    text: 'Nagsugod ang Junior/Children’s church',
  },
  {
    date: 'Abril 2014',
    text: 'Giila ang PFBC nga miyembro sa IL-MO ARBC (Illinois-Missouri Association of Regular Baptist Churches)',
  },
  {
    date: 'Hunyo 2014',
    text: 'Giila ang PFBC nga miyembro sa GARBC (General Association of Regular Baptist Churches)',
  },
  {
    date: 'Okt. 2014',
    text: 'Nagsugod ang ministeryo sa Alden Gardens of Waterford Assisted Living',
  },
  {
    date: 'Ene. 2016',
    text: 'Nagsugod ang buhat sa misyon sa Sta. Barbara ug Duenas, Iloilo, Pilipinas, kauban sila si Pastor Ernesto Gallinero ug Pastor Freddie Ardiente sa Lighthouse Fundamental Baptist Church',
  },
  {
    date: 'Hul. 30, 2017',
    text: 'Paghiusa sa Book Road Baptist Church, ug si Pastor Brad Blissett nahimong Associate Pastor; nagpadayon ang suporta sa misyonero alang kang Pastor Bill ug Tamra Branks (Michigan) ug Pastor Chris ug Maylin Hartwick (Hong Kong)',
  },
  {
    date: 'Ene. 2018',
    text: 'Gilunsad ang buhat sa misyon sa Dumangas, Iloilo, kauban si Pastor Glenn Pacquiao sa Patlad Fundamental Baptist Church',
  },
  {
    date: 'Hunyo 2018',
    text: 'Nadugang ang ministeryo sa misyon: The Journey kauban si Pastor Jogli Tupas, nga nagtutok sa mga komunidad nga Muslim sa Sabah, Malaysia, ug sa Southern Mindanao, Pilipinas',
  },
  {
    date: 'Sep. 21, 2018',
    text: 'Legal nga pag-ilis sa ngalan gikan sa Book Rd Baptist Church ngadto sa Pillar of Faith Baptist Church',
  },
  {
    date: 'Marso 2020',
    text: 'Mihunong ang personal nga pagtigom panahon sa pandemya sa COVID-19; nagpadayon ang pagsimba kada Dominggo online (Facebook Live) uban ang matag-semana nga Zoom prayer meeting',
  },
  {
    date: 'Enero 2022',
    text: 'Nakig-partner sa lainlaing Gospel Radio Ministries sa rehiyon sa Visayas, Pilipinas',
  },
  {
    date: 'Okt. 08, 2022',
    text: 'Nagsugod ang ministeryo sa Alden Estates of Naperville Nursing Home',
  },
  {
    date: 'Okt. 2023',
    text: 'Nagsugod sa pagsuporta sa outreach sa misyon sa Moalboal, Cebu, Pilipinas, kauban si Pastor Jimmy Inventor',
  },
  {
    date: 'Hunyo 2024',
    text: 'Pakigtambayayong sa ministeryo sa Ebanghelyo sa mga komunidad nga Muslim kauban si Pastor Earl Magdale sa Mindanao Frontier Missions Partnership Inc, Midsayap, Cotabato, Pilipinas',
  },
  {
    date: 'Peb. 01, 2026',
    text: 'Pagbalhin sa pastoral nga pagpangulo; nagsugod sa pag-alagad si Pastor Kris Paolo Akut nga bag-ong lead pastor',
  },
  {
    date: 'Hunyo 2026',
    text: 'Human sa 22 ka tuig nga matinud-anong pag-alagad isip Lead Pastor, miretiro si Pastor Ruel Akut sunod sa unom ka bulan nga sabbatical',
  },
  {
    date: 'Ago. 16, 2026',
    text: 'Installation service alang kang Pastor Kris Paolo Akut nga lead pastor sa Pillar of Faith Baptist Church',
  },
  {
    date: 'Ago. 23, 2026',
    text: 'Commissioning service alang kang Pastor Ruel Akut nga presidente sa Doane Baptist Bible Institute (DBBI), Iloilo City, Pilipinas',
  },
  {
    date: 'Sep. 2026',
    text: 'Nakig-partner kang Pastor Ruel Akut aron suportahan ang ministeryo ug misyon sa Doane Baptist Bible Institute (DBBI)',
  },
]

const hil: EventCopy[] = [
  {
    date: 'Nob. 01, 2001',
    text: 'Una nga Bible study sa balay nila ni Sammy kag Charity Odasco, Romeoville, IL',
  },
  {
    date: 'Okt. 26, 2003',
    text: 'Commissioning service nga ginhimo sa Fil-American Baptist Church, Chicago',
  },
  {
    date: 'Nob. 09, 2003',
    text: 'Una nga pagsimba subong daughter church nga ginpadala halin sa Fil-American Baptist Church, ginhimo sa Ramada Limited Hotel, Bolingbrook',
  },
  {
    date: 'Set. 2004',
    text: 'Gindawat ang ngalan nga Pillar of Faith Baptist Fellowship (PFBF)',
  },
  {
    date: 'Nob. 27, 2005',
    text: 'Nagbalhin ang PFBF sa Book Road Baptist Church, Naperville, IL',
  },
  {
    date: 'Hul. 2007',
    text: 'Una nga hilikuton sa misyon sa Alangalang, Leyte, kaupod ang New Life Baptist Church sang Tacloban City, Leyte (Pastor Ed Rayos, Pastor Ely Haligado, Pastor Edilberto Nasayao)',
  },
  {
    date: 'Hunyo 2–4, 2009',
    text: 'Una nga Evangelistic Medical-Dental Missions sa Alangalang, Leyte, kaupod ang Fil-American Baptist Church',
  },
  {
    date: 'Set. 2009',
    text: 'Nagsugod ang ministeryo sa Heritage Woods Assisted Living Facility sa Bolingbrook kaupod ang First Baptist Church of Lockport; nag-upod sang ulihi ang Fil-American Baptist Church sa sini nga outreach sa nursing home sa southwest suburbs',
  },
  {
    date: 'Hunyo 24, 2012',
    text: 'Pag-ilis sang ngalan pakadto sa Pillar of Faith Baptist Church (PFBC) kag pagdawat sang church covenant, constitution, kag by-laws',
  },
  {
    date: 'Abr. 07, 2013',
    text: 'Una nga eleksyon sang mga opisyal sang church',
  },
  {
    date: 'Marso 2014',
    text: 'Nagsugod ang Junior/Children’s church',
  },
  {
    date: 'Abril 2014',
    text: 'Ginkilala ang PFBC nga miyembro sang IL-MO ARBC (Illinois-Missouri Association of Regular Baptist Churches)',
  },
  {
    date: 'Hunyo 2014',
    text: 'Ginkilala ang PFBC nga miyembro sang GARBC (General Association of Regular Baptist Churches)',
  },
  {
    date: 'Okt. 2014',
    text: 'Nagsugod ang ministeryo sa Alden Gardens of Waterford Assisted Living',
  },
  {
    date: 'Ene. 2016',
    text: 'Nagsugod ang hilikuton sa misyon sa Sta. Barbara kag Duenas, Iloilo, Pilipinas, kaupod sila si Pastor Ernesto Gallinero kag Pastor Freddie Ardiente sang Lighthouse Fundamental Baptist Church',
  },
  {
    date: 'Hul. 30, 2017',
    text: 'Pag-isa sa Book Road Baptist Church, kag si Pastor Brad Blissett nangin Associate Pastor; nagpadayon ang suporta sa misyonero para kay Pastor Bill kag Tamra Branks (Michigan) kag Pastor Chris kag Maylin Hartwick (Hong Kong)',
  },
  {
    date: 'Ene. 2018',
    text: 'Ginlunsad ang hilikuton sa misyon sa Dumangas, Iloilo, kaupod si Pastor Glenn Pacquiao sang Patlad Fundamental Baptist Church',
  },
  {
    date: 'Hunyo 2018',
    text: 'Nadugang ang ministeryo sang misyon: The Journey kaupod si Pastor Jogli Tupas, nga naga-focus sa mga komunidad nga Muslim sa Sabah, Malaysia, kag sa Southern Mindanao, Pilipinas',
  },
  {
    date: 'Set. 21, 2018',
    text: 'Legal nga pag-ilis sang ngalan halin sa Book Rd Baptist Church pakadto sa Pillar of Faith Baptist Church',
  },
  {
    date: 'Marso 2020',
    text: 'Nag-untat ang personal nga pagtipon sa tion sang pandemya sang COVID-19; nagpadayon ang pagsimba kada Domingo online (Facebook Live) kaupod ang kada-semana nga Zoom prayer meeting',
  },
  {
    date: 'Enero 2022',
    text: 'Nagpartner sa nanuhaytuhay nga Gospel Radio Ministries sa rehiyon sang Visayas, Pilipinas',
  },
  {
    date: 'Okt. 08, 2022',
    text: 'Nagsugod ang ministeryo sa Alden Estates of Naperville Nursing Home',
  },
  {
    date: 'Okt. 2023',
    text: 'Nagsugod sa pagsakdag sang outreach sa misyon sa Moalboal, Cebu, Pilipinas, kaupod si Pastor Jimmy Inventor',
  },
  {
    date: 'Hunyo 2024',
    text: 'Pagpartner sa ministeryo sang Ebanghelyo sa mga komunidad nga Muslim kaupod si Pastor Earl Magdale sang Mindanao Frontier Missions Partnership Inc, Midsayap, Cotabato, Pilipinas',
  },
  {
    date: 'Peb. 01, 2026',
    text: 'Pagbalhin sang pastoral nga pagpamuno; nagsugod nga nag-alagad si Pastor Kris Paolo Akut nga bag-o nga lead pastor',
  },
  {
    date: 'Hunyo 2026',
    text: 'Pagkatapos sang 22 ka tuig nga matinumanon nga pag-alagad subong Lead Pastor, nagretiro si Pastor Ruel Akut sunod sa anom ka bulan nga sabbatical',
  },
  {
    date: 'Ago. 16, 2026',
    text: 'Installation service para kay Pastor Kris Paolo Akut nga lead pastor sang Pillar of Faith Baptist Church',
  },
  {
    date: 'Ago. 23, 2026',
    text: 'Commissioning service para kay Pastor Ruel Akut nga presidente sang Doane Baptist Bible Institute (DBBI), Iloilo City, Pilipinas',
  },
  {
    date: 'Set. 2026',
    text: 'Nagpartner kay Pastor Ruel Akut agod suportahan ang ministeryo kag misyon sang Doane Baptist Bible Institute (DBBI)',
  },
]

const ilo: EventCopy[] = [
  {
    date: 'Nob. 01, 2001',
    text: 'Umuna a Bible study iti balay da Sammy ken Charity Odasco, Romeoville, IL',
  },
  {
    date: 'Okt. 26, 2003',
    text: 'Commissioning service a naangay idiay Fil-American Baptist Church, Chicago',
  },
  {
    date: 'Nob. 09, 2003',
    text: 'Umuna a panagdaydayaw a kas anak a church a naibaon manipud iti Fil-American Baptist Church, naangay idiay Ramada Limited Hotel, Bolingbrook',
  },
  {
    date: 'Set. 2004',
    text: 'Naawat ti nagan a Pillar of Faith Baptist Fellowship (PFBF)',
  },
  {
    date: 'Nob. 27, 2005',
    text: 'Nimmalis ti PFBF idiay Book Road Baptist Church, Naperville, IL',
  },
  {
    date: 'Hul. 2007',
    text: 'Umuna a trabaho ti misyon idiay Alangalang, Leyte, a kadua ti New Life Baptist Church ti Tacloban City, Leyte (Pastor Ed Rayos, Pastor Ely Haligado, Pastor Edilberto Nasayao)',
  },
  {
    date: 'Hunio 2–4, 2009',
    text: 'Umuna nga Evangelistic Medical-Dental Missions idiay Alangalang, Leyte, a kadua ti Fil-American Baptist Church',
  },
  {
    date: 'Set. 2009',
    text: 'Nangrugi ti ministerio idiay Heritage Woods Assisted Living Facility iti Bolingbrook a kadua ti First Baptist Church of Lockport; immay kalpasanna ti Fil-American Baptist Church iti daytoy nga outreach iti nursing home kadagiti abagatan-laud a suburb',
  },
  {
    date: 'Hunio 24, 2012',
    text: 'Panagsukat ti nagan iti Pillar of Faith Baptist Church (PFBC) ken panangawat iti church covenant, constitution, ken by-laws',
  },
  {
    date: 'Abr. 07, 2013',
    text: 'Umuna a panagbutos dagiti opisial ti church',
  },
  {
    date: 'Marso 2014',
    text: 'Nangrugi ti Junior/Children’s church',
  },
  {
    date: 'Abril 2014',
    text: 'Nabigbig ti PFBC a kameng ti IL-MO ARBC (Illinois-Missouri Association of Regular Baptist Churches)',
  },
  {
    date: 'Hunio 2014',
    text: 'Nabigbig ti PFBC a kameng ti GARBC (General Association of Regular Baptist Churches)',
  },
  {
    date: 'Okt. 2014',
    text: 'Nangrugi ti ministerio idiay Alden Gardens of Waterford Assisted Living',
  },
  {
    date: 'Ene. 2016',
    text: 'Nangrugi ti trabaho ti misyon idiay Sta. Barbara ken Duenas, Iloilo, Pilipinas, a kadua da Pastor Ernesto Gallinero ken Pastor Freddie Ardiente ti Lighthouse Fundamental Baptist Church',
  },
  {
    date: 'Hul. 30, 2017',
    text: 'Panagtipon iti Book Road Baptist Church, ket ni Pastor Brad Blissett ti nagbalin nga Associate Pastor; nagtuloy ti suporta iti misyonero para kada Pastor Bill ken Tamra Branks (Michigan) ken Pastor Chris ken Maylin Hartwick (Hong Kong)',
  },
  {
    date: 'Ene. 2018',
    text: 'Nailunsad ti trabaho ti misyon idiay Dumangas, Iloilo, a kadua ni Pastor Glenn Pacquiao ti Patlad Fundamental Baptist Church',
  },
  {
    date: 'Hunio 2018',
    text: 'Nainayon ti ministerio ti misyon: The Journey a kadua ni Pastor Jogli Tupas, a nakatutok kadagiti komunidad a Muslim idiay Sabah, Malaysia, ken idiay Southern Mindanao, Pilipinas',
  },
  {
    date: 'Set. 21, 2018',
    text: 'Legal a panagsukat ti nagan manipud Book Rd Baptist Church agingga iti Pillar of Faith Baptist Church',
  },
  {
    date: 'Marso 2020',
    text: 'Nagsardeng ti personal a panagtitipon iti tiempo ti pandemya ti COVID-19; nagtuloy ti panagdaydayaw iti Domingo online (Facebook Live) a kadua ti lingguhan a Zoom prayer meeting',
  },
  {
    date: 'Enero 2022',
    text: 'Nakipagpartner kadagiti nadumaduma a Gospel Radio Ministries iti rehion ti Visayas, Pilipinas',
  },
  {
    date: 'Okt. 08, 2022',
    text: 'Nangrugi ti ministerio idiay Alden Estates of Naperville Nursing Home',
  },
  {
    date: 'Okt. 2023',
    text: 'Inrugi ti panangsuporta iti outreach ti misyon idiay Moalboal, Cebu, Pilipinas, a kadua ni Pastor Jimmy Inventor',
  },
  {
    date: 'Hunio 2024',
    text: 'Panagpartner iti ministerio ti Ebanghelio kadagiti komunidad a Muslim a kadua ni Pastor Earl Magdale ti Mindanao Frontier Missions Partnership Inc, Midsayap, Cotabato, Pilipinas',
  },
  {
    date: 'Peb. 01, 2026',
    text: 'Panagbaliw ti pastoral a panangidaulo; inrugi ni Pastor Kris Paolo Akut ti panagserbi a baro a lead pastor',
  },
  {
    date: 'Hunio 2026',
    text: 'Kalpasan ti 22 a tawen a natalek a panagserbi a kas Lead Pastor, nagretiro ni Pastor Ruel Akut kalpasan ti innem a bulan a sabbatical',
  },
  {
    date: 'Ago. 16, 2026',
    text: 'Installation service para ken Pastor Kris Paolo Akut a lead pastor ti Pillar of Faith Baptist Church',
  },
  {
    date: 'Ago. 23, 2026',
    text: 'Commissioning service para ken Pastor Ruel Akut a presidente ti Doane Baptist Bible Institute (DBBI), Iloilo City, Pilipinas',
  },
  {
    date: 'Set. 2026',
    text: 'Nakipagpartner ken Pastor Ruel Akut tapno suportaranna ti ministerio ken misyon ti Doane Baptist Bible Institute (DBBI)',
  },
]

const es: EventCopy[] = [
  {
    date: '1 nov. 2001',
    text: 'Primer estudio bíblico en la casa de Sammy y Charity Odasco, Romeoville, IL',
  },
  {
    date: '26 oct. 2003',
    text: 'Servicio de comisión celebrado en Fil-American Baptist Church, Chicago',
  },
  {
    date: '9 nov. 2003',
    text: 'Primer culto como iglesia hija enviada desde Fil-American Baptist Church, celebrado en el Ramada Limited Hotel, Bolingbrook',
  },
  {
    date: 'sep. 2004',
    text: 'Se adoptó el nombre Pillar of Faith Baptist Fellowship (PFBF)',
  },
  {
    date: '27 nov. 2005',
    text: 'PFBF se mudó a Book Road Baptist Church, Naperville, IL',
  },
  {
    date: 'jul. 2007',
    text: 'Primera obra misionera en Alangalang, Leyte, en asociación con New Life Baptist Church de Tacloban City, Leyte (pastor Ed Rayos, pastor Ely Haligado, pastor Edilberto Nasayao)',
  },
  {
    date: '2–4 jun. 2009',
    text: 'Primeras misiones médicas y dentales evangelísticas en Alangalang, Leyte, junto con Fil-American Baptist Church',
  },
  {
    date: 'sep. 2009',
    text: 'Comenzó el ministerio en Heritage Woods Assisted Living Facility en Bolingbrook, en asociación con First Baptist Church of Lockport; Fil-American Baptist Church se unió después a este alcance en residencias del suroeste',
  },
  {
    date: '24 jun. 2012',
    text: 'Cambio de nombre a Pillar of Faith Baptist Church (PFBC) y adopción del pacto, la constitución y los estatutos de la iglesia',
  },
  {
    date: '7 abr. 2013',
    text: 'Primera elección de oficiales de la iglesia',
  },
  {
    date: 'marzo 2014',
    text: 'Comenzó la iglesia de niños',
  },
  {
    date: 'abril 2014',
    text: 'PFBC fue reconocida como miembro de IL-MO ARBC (Illinois-Missouri Association of Regular Baptist Churches)',
  },
  {
    date: 'jun. 2014',
    text: 'PFBC fue reconocida como miembro de GARBC (General Association of Regular Baptist Churches)',
  },
  {
    date: 'oct. 2014',
    text: 'Comenzó el ministerio en Alden Gardens of Waterford Assisted Living',
  },
  {
    date: 'ene. 2016',
    text: 'Comenzó la obra misionera en Sta. Barbara y Duenas, Iloilo, Filipinas, con el pastor Ernesto Gallinero y el pastor Freddie Ardiente de Lighthouse Fundamental Baptist Church',
  },
  {
    date: '30 jul. 2017',
    text: 'Unificación con Book Road Baptist Church, y el pastor Brad Blissett pasó a ser pastor asociado; continuó el sostenimiento misionero del pastor Bill y Tamra Branks (Michigan) y del pastor Chris y Maylin Hartwick (Hong Kong)',
  },
  {
    date: 'ene. 2018',
    text: 'Se inició la obra misionera en Dumangas, Iloilo, con el pastor Glenn Pacquiao de Patlad Fundamental Baptist Church',
  },
  {
    date: 'jun. 2018',
    text: 'Se añadió el ministerio misionero The Journey con el pastor Jogli Tupas, enfocado en comunidades musulmanas en Sabah, Malasia, y en el sur de Mindanao, Filipinas',
  },
  {
    date: '21 sep. 2018',
    text: 'Cambio legal de nombre de Book Rd Baptist Church a Pillar of Faith Baptist Church',
  },
  {
    date: 'marzo 2020',
    text: 'Las reuniones presenciales se pausaron durante la pandemia de COVID-19; el culto del domingo continuó en línea (Facebook Live) con reuniones semanales de oración por Zoom',
  },
  {
    date: 'enero 2022',
    text: 'Se asoció con varios ministerios de radio del evangelio en la región de Visayas, Filipinas',
  },
  {
    date: '8 oct. 2022',
    text: 'Comenzó el ministerio en Alden Estates of Naperville Nursing Home',
  },
  {
    date: 'oct. 2023',
    text: 'Comenzó el sostenimiento de un alcance misionero en Moalboal, Cebú, Filipinas, con el pastor Jimmy Inventor',
  },
  {
    date: 'jun. 2024',
    text: 'Asociación en el ministerio del evangelio a comunidades musulmanas con el pastor Earl Magdale de Mindanao Frontier Missions Partnership Inc, Midsayap, Cotabato, Filipinas',
  },
  {
    date: '1 feb. 2026',
    text: 'Transición del liderazgo pastoral; el pastor Kris Paolo Akut comenzó a servir como nuevo pastor principal',
  },
  {
    date: 'jun. 2026',
    text: 'Después de 22 años de servicio fiel como pastor principal, el pastor Ruel Akut se jubiló tras un sabático de seis meses',
  },
  {
    date: '16 ago. 2026',
    text: 'Servicio de instalación del pastor Kris Paolo Akut como pastor principal de Pillar of Faith Baptist Church',
  },
  {
    date: '23 ago. 2026',
    text: 'Servicio de comisión del pastor Ruel Akut como presidente de Doane Baptist Bible Institute (DBBI), Iloilo City, Filipinas',
  },
  {
    date: 'sep. 2026',
    text: 'Se asoció con el pastor Ruel Akut para sostener el ministerio y la misión de Doane Baptist Bible Institute (DBBI)',
  },
]

const BY_LANG: Partial<Record<LangId, EventCopy[]>> = { tl, ceb, hil, ilo, es }

for (const [lang, events] of Object.entries(BY_LANG)) {
  if (events.length !== CHURCH_HISTORY_MILESTONES.length) {
    throw new Error(
      `PFBC history ${lang} has ${events.length} events; expected ${CHURCH_HISTORY_MILESTONES.length}`,
    )
  }
}

export function historyEvent(lang: LangId, index: number, fallback: EventCopy): EventCopy {
  return BY_LANG[lang]?.[index] ?? fallback
}
