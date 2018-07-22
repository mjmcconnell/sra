const stockistsData = [
  {
    name: 'National Trust, Causeway Visitor Centre',
    image: '/images/stockists/causeway.jpg',
    address: [
      'Causeway Road, Bushmills'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Giant\'s+Causeway+Visitor+Centre/@55.2334222,-6.5166117,15z/data=!4m2!3m1!1s0x0:0x9b0e07afdc38c0ec?sa=X&ved=0ahUKEwi3w8SFsrPcAhWGC8AKHeKNDAUQ_BIIzQEwCg',
  },
  {
    name: 'National Trust, Mount Stewart',
    image: '/images/stockists/mount.jpg',
    address: [
      'Portaferry Road, Newtownards'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/National+Trust+-+Mount+Stewart+House,+Garden+and+Temple+of+the+Winds/@54.551616,-5.601919,15z/data=!4m2!3m1!1s0x0:0x4d8421bd9e57db4b?sa=X&ved=0ahUKEwiHler-sbPcAhWTTMAKHdXkCMEQ_BIIqgEwDQ',
  },
  {
    name: 'Unique Art Shop @ University of Ulster',
    image: '/images/stockists/unique.jpg',
    address: [
      'York Street, Belfast'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Ulster+University/@54.6038134,-5.9315463,17z/data=!3m1!4b1!4m5!3m4!1s0x4861084ca01b3ccd:0xf36a06a9666eabcc!8m2!3d54.6038103!4d-5.9293576',
  },
  {
    name: 'Black Canvas Gallery',
    image: '/images/stockists/black.jpg',
    address: [
      'High Street, Holywood'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Black+Canvas+Gallery/@54.6417543,-5.8343618,15z/data=!4m2!3m1!1s0x0:0xfd9cd05c2f8331d1?sa=X&ved=0ahUKEwii38rmsbPcAhWrDsAKHXGHAWIQ_BIIdTAP',
  },
  {
    name: 'Gallery 1608',
    image: '/images/stockists/1608.jpg',
    address: [
      'Main Street, Bushmills'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Gallery+1608/@55.205258,-6.523498,15z/data=!4m2!3m1!1s0x0:0xee8e6d7f44d5e65?sa=X&ved=0ahUKEwjm5dTfsbPcAhUiJcAKHUgVCSgQ_BIIiQEwDg',
  },
  {
    name: 'No4 Queens Street',
    image: '/images/stockists/queens.jpg',
    address: [
      'Queens Court, Coleraine'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Kingfisher+Craft+Gallery/@54.4012041,-5.6525721,15z/data=!4m2!3m1!1s0x0:0x1fdf9de1f5f3d0b8?sa=X&ved=0ahUKEwihmOHasbPcAhUsC8AKHQ3mAFYQ_BIIdjAP',
  },
  {
    name: 'Kingfisher Craft Gallery',
    image: '/images/stockists/kingfisher.jpg',
    address: [
      'High Street, Killyleagh'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Kingfisher+Craft+Gallery/@54.4012041,-5.6525721,15z/data=!4m2!3m1!1s0x0:0x1fdf9de1f5f3d0b8?sa=X&ved=0ahUKEwiS08T4srPcAhVkCsAKHVoxD4QQ_BIIdjAP',
  },
  {
    name: 'The Puffin Gallery',
    image: '/images/stockists/puffin.jpg',
    address: [
      'Ann Street, Ballycastle'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/The+Puffin+Gallery+of+Art,+High+Crafts+%26+Jewellery/@55.2021241,-6.2484758,15z/data=!4m2!3m1!1s0x0:0x36199a4175cccd61?sa=X&ved=0ahUKEwi-pcvVsbPcAhVlGsAKHZsGBuwQ_BIIeDAP',
  },
  {
    name: 'Ards Craft and Design Centre',
    image: '/images/stockists/ards.jpg',
    address: [
      'Regent Street, Newtownards'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps?rlz=1C5CHFA_enGB765GB765&q=ards+craft+and+design+centre,+newtownards&um=1&ie=UTF-8&sa=X&ved=0ahUKEwi6tMTMsbPcAhVJVsAKHR-qD5cQ_AUICigB',
  },
  {
    name: 'Top Floor Art',
    image: '/images/stockists/topfloor.jpg',
    address: [
      'Main Street, Saintfield'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Top+Floor+Art+Gallery+%26+Open+Studios/@54.4600081,-5.8355603,15z/data=!4m2!3m1!1s0x0:0x565324a56eecc8b4?sa=X&ved=0ahUKEwjrr9rFsbPcAhXBK8AKHXdgCSsQ_BIIggEwDw',
  },
  {
    name: 'InKlover',
    image: '/images/stockists/klover.jpg',
    address: [
      'The Corner House, Hillsborough'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/in+kl%C3%B6ver/@54.46309,-6.0828831,15z/data=!4m2!3m1!1s0x0:0x30a861a5ed06eb5d?sa=X&ved=0ahUKEwiv9Je8sbPcAhVBAcAKHbqlBtUQ_BIIbTAK',
  },
  {
    name: 'Cuan Crafts',
    image: '/images/stockists/cuan.jpg',
    address: [
      'Portaferry'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Portaferry,+Newtownards/data=!4m2!3m1!1s0x4861693d2065f9eb:0x7919f8ccbb0c0371?sa=X&ved=0ahUKEwiPxM6usbPcAhXUY8AKHRcxAFUQ8gEI1QEwDw',
  },
  {
    name: 'Synergy',
    image: '/images/stockists/synergy.jpg',
    address: [
      'Central Promenade, Newcastle'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/Synergy+Studios/@54.206745,-5.892869,15z/data=!4m2!3m1!1s0x0:0x2c3a2be649d834b4?sa=X&ved=0ahUKEwjqv_uKsbPcAhWFfMAKHdRjDHQQ_BIIcTAK',
  },
  {
    name: 'The Quay Gallery',
    image: '/images/stockists/quay.jpg',
    address: [
      'The Quay, Cloonmonad, Westport'
    ],
    mapImage: '',
    mapLink: 'https://www.google.co.uk/maps/place/The+Quay+Gallery,+A+Fusion+of+Irish+Fine+Art+and+Craft/@53.7998944,-9.548941,15z/data=!4m2!3m1!1s0x0:0xcb0a9d9178972de?sa=X&ved=0ahUKEwjD4LSXsbPcAhUBI8AKHRFmAFwQ_BIIfjAK',
  },
];

export default stockistsData;
