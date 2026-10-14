import type { CarouselSlide } from '../components/ImageCarousel'

export type Ministry = {
  title: string
  desc: string
  images: CarouselSlide[]
}

export const MINISTRIES: Ministry[] = [
  {
    title: 'Sunday Gathering',
    desc: 'We gather each Lord\'s Day to worship, pray, and hear the Word preached.',
    images: [
      {
        src: '/photos/sunday-gathering/843668006_29488162067438740_5502471221308412407_n.jpg',
        alt: 'Congregation listening attentively during Sunday worship',
        position: 'center 42%',
      },
      {
        src: '/photos/sunday-gathering/549287316_25292139603707695_5766534834206744682_n.jpg',
        alt: 'Pillar of Faith Baptist Church congregation gathered together in the sanctuary',
        position: 'center 48%',
      },
      {
        src: '/photos/sunday-gathering/842970337_29488165190771761_4257027920477132162_n.jpg',
        alt: 'PFBC congregation at the 23rd anniversary celebration in the sanctuary',
        position: 'center 55%',
      },
      {
        src: '/photos/sunday-gathering/517338733_24636055089316153_5988910787523078076_n.jpg',
        alt: 'Congregation worshipping together on Sunday',
        position: 'center 24%',
      },
      {
        src: '/photos/sunday-gathering/518021647_24636057472649248_8637393044207792188_n.jpg',
        alt: 'Church family gathered for worship',
        position: 'center 42%',
      },
      {
        src: '/photos/sunday-gathering/502935917_24328691163385882_1200113461116794571_n.jpg',
        alt: 'Sunday worship in the sanctuary',
        position: 'center 38%',
      },
      {
        src: '/photos/sunday-gathering/550003244_25292137233707932_9071258745107844587_n.jpg',
        alt: 'Greeting one another after the gathering',
        position: '38% 42%',
      },
      {
        src: '/photos/sunday-gathering/671836689_27207935272128109_7040915597854052709_n.jpg',
        alt: 'The church family together after worship',
        position: 'center 42%',
      },
      {
        src: '/photos/sunday-gathering/DSC00542.jpeg',
        alt: 'Congregation gathered for a special Sunday service',
        position: 'center 38%',
      },
    ],
  },
  {
    title: 'Kids & Youth',
    desc: 'From VBS to Sunday School — we invest in the next generation of believers.',
    images: [
      {
        src: '/photos/kids-youth/843449662_29488164137438533_3078461031036656746_n.jpg',
        alt: 'Youth and young adults gathered for fellowship and a meal together',
        position: 'center 42%',
      },
      {
        src: '/photos/kids-youth/516544947_24635154566072872_2933792329099475407_n.jpg',
        alt: 'Children and congregation at a VBS gathering',
        position: 'center 42%',
      },
      {
        src: '/photos/kids-youth/502584763_24328691143385884_5520636936981361621_n.jpg',
        alt: 'Kids celebrating at a church event',
        position: 'center 40%',
      },
      {
        src: '/photos/kids-youth/496128323_24151766374411696_8815776523832628372_n.jpg',
        alt: 'A family together after a kids ministry gathering',
        position: 'center 42%',
      },
      {
        src: '/photos/kids-youth/552853380_25292136080374714_3672523363135185150_n.jpg',
        alt: 'Youth enjoying an outing together',
        position: 'center 45%',
      },
      {
        src: '/photos/kids-youth/548053115_25292136823707973_3909520797462130163_n.jpg',
        alt: 'Youth hanging out together at a church event',
        position: 'center 40%',
      },
      {
        src: '/photos/kids-youth/754463052_27946191551641050_460587242493582951_n.jpg',
        alt: 'Youth smiling together on a church outing',
        position: 'center 42%',
      },
      {
        src: '/photos/kids-youth/502606402_24328690953385903_8341589609581444440_n.jpg',
        alt: 'Youth singing together at a church event',
        position: 'center 42%',
      },
      {
        src: '/photos/kids-youth/495763981_24165448763043457_3592681355411531828_n.jpg',
        alt: 'Youth playing games together on a church outing',
        position: 'center 45%',
      },
      {
        src: '/photos/kids-youth/671638679_27207934918794811_3979794428649481546_n.jpg',
        alt: 'Kids and youth playing together at a gathering',
        position: 'center 45%',
      },
      {
        src: '/photos/kids-youth/DSC00546.jpeg',
        alt: 'Kids ministry in action',
        position: 'center 42%',
      },
    ],
  },
  {
    title: 'Music Ministry',
    desc: 'Voices and instruments lifting praise — special seasons and every Sunday.',
    images: [
      {
        src: '/photos/music/843449562_29488162537438693_8343179785057914004_n.jpg',
        alt: 'PFBC choir singing during the 23rd anniversary service',
        position: 'center 45%',
      },
      {
        src: '/photos/music/844977929_29488162544105359_5495345138626779045_n.jpg',
        alt: 'PFBC choir leading worship — Shout Out for Joy at the 23rd anniversary',
        position: 'center 45%',
      },
      {
        src: '/photos/music/516532295_24636057832649212_2114271392152699324_n.jpg',
        alt: 'Music ministry members rehearsing together before worship',
        position: 'center 42%',
      },
      {
        src: '/photos/music/516736991_24636057509315911_7910220737040644001_n.jpg',
        alt: 'Sharing the Word during a Christmas music gathering',
        position: 'center 40%',
      },
      {
        src: '/photos/music/517587438_24636057799315882_9110016724119776615_n.jpg',
        alt: 'Church musicians playing during worship',
        position: '48% 40%',
      },
      {
        src: '/photos/music/518114438_24636057372649258_6924969113551921272_n.jpg',
        alt: 'A worship leader conducting the music ministry',
        position: 'center 42%',
      },
      {
        src: '/photos/music/516746914_24636057825982546_6854212032106285495_n.jpg',
        alt: 'A young singer and choir leading worship',
        position: 'center 32%',
      },
      {
        src: '/photos/music/548183369_25292136827041306_6711462776166131913_n.jpg',
        alt: 'The choir lifting praise during a service',
        position: 'center 36%',
      },
      {
        src: '/photos/music/670878237_27207934615461508_8267659818744544897_n.jpg',
        alt: 'Leading music during a Christmas gathering',
        position: '42% 38%',
      },
      {
        src: '/photos/music/672141895_27207935162128120_8639455094595127829_n.jpg',
        alt: 'Music ministry members gathered together at Christmas',
        position: 'center 38%',
      },
      {
        src: '/photos/music/DSC00535.jpeg',
        alt: 'Music ministry during worship',
        position: 'center 42%',
      },
      {
        src: '/photos/music/DSC00539.jpeg',
        alt: 'Praise team leading worship',
        position: 'center 40%',
      },
    ],
  },
  {
    title: 'Outreach',
    desc: 'Serving our neighbors in nursing homes and the community beyond our walls.',
    images: [
      {
        src: '/photos/outreach/DSC00009.jpeg',
        alt: 'Church members leading worship at a senior care facility',
        position: 'center 40%',
      },
      {
        src: '/photos/outreach/DSC00025.jpeg',
        alt: 'Church members visiting residents in a care-home hallway',
        position: '32% 38%',
      },
      {
        src: '/photos/outreach/DSC00037.jpeg',
        alt: 'Sharing the Word during a nursing-home outreach',
        position: 'center 30%',
      },
      {
        src: '/photos/outreach/DSC09999.jpeg',
        alt: 'Church family gathered in prayer during outreach',
        position: 'center 42%',
      },
      {
        src: '/photos/outreach/762432925_10237311021329262_2529164996011737062_n.jpeg',
        alt: 'Serving the community beyond our walls',
        position: 'center 40%',
      },
    ],
  },
  {
    title: 'Fellowship',
    desc: 'Meals, anniversaries, and life together — because church is family.',
    images: [
      {
        src: '/photos/fellowship/844341208_29488163077438639_9015671461636739895_n.jpg',
        alt: 'Church family sharing a fellowship meal together',
        position: 'center 42%',
      },
      {
        src: '/photos/fellowship/503399352_24331825136405818_2085474509838351947_n.jpg',
        alt: 'Multi-generational church family gathered for Bible study',
        position: 'center 42%',
      },
      {
        src: '/photos/fellowship/504658650_24366176032970728_7785424084982135039_n.jpg',
        alt: 'A fellowship brunch around the table',
        position: 'center 45%',
      },
      {
        src: '/photos/fellowship/550367218_25292139273707728_539689081154495027_n.jpg',
        alt: 'Friends laughing together over coffee',
        position: 'center 35%',
      },
      {
        src: '/photos/fellowship/502846753_24328691250052540_132875848438002592_n.jpg',
        alt: 'A church picnic under the pavilion',
        position: 'center 48%',
      },
      {
        src: '/photos/fellowship/517586364_24635154712739524_994498515736186281_n.jpg',
        alt: 'Friends together at Family Camp',
        position: 'center 38%',
      },
      {
        src: '/photos/fellowship/503651154_24331824986405833_3217562483696949493_n.jpg',
        alt: 'Friends laughing together during a church game night',
        position: 'center 40%',
      },
      {
        src: '/photos/fellowship/550255264_25292138390374483_3822662493333129180_n.jpg',
        alt: 'A quiet moment together at a Christmas gathering',
        position: '42% 28%',
      },
      {
        src: '/photos/fellowship/648540388_26828880326700274_3216799213624290085_n.jpg',
        alt: 'Friends together after a church gathering',
        position: 'center 38%',
      },
    ],
  },
  {
    title: 'Community',
    desc: 'Multi-generational, multicultural, and always welcoming.',
    images: [
      {
        src: '/photos/community/503266736_24331824863072512_9208802171209696456_n.jpg',
        alt: 'Church member holding a baby at a fellowship gathering',
        position: '42% 20%',
      },
      {
        src: '/photos/community/503375381_24331825123072486_9069273209753226236_n.jpg',
        alt: 'Friends smiling together after a meal',
        position: 'center 35%',
      },
      {
        src: '/photos/community/516499016_24636057755982553_2753889657582507841_n.jpg',
        alt: 'Church members standing together in support of one another',
        position: 'center 32%',
      },
      {
        src: '/photos/community/517645564_24636057789315883_7852092191010094446_n.jpg',
        alt: 'PFBC Family Camp — Set Apart, Shipshewana',
        position: 'center 48%',
      },
      {
        src: '/photos/community/550532360_25292139643707691_985090817145462730_n.jpg',
        alt: 'Friends smiling together at a church celebration',
        position: 'center 32%',
      },
      {
        src: '/photos/community/550617012_25292138277041161_7177304386433108082_n.jpg',
        alt: 'Families together after a church gathering',
        position: 'center 40%',
      },
      {
        src: '/photos/community/669772276_27207939612127675_5129598933091171053_n.jpg',
        alt: 'PFBC Family Camp — Set Apart, Michigan City',
        position: 'center 42%',
      },
    ],
  },
]
