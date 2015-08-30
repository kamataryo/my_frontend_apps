var $map, NPs, base, initialPosition, key, map_canvas, moveToCurrentPosition, myOptions, selectbox, value;

moveToCurrentPosition = function(gmapobj) {
  var opts;
  if (navigator.geolocation) {
    opts = {
      enableHighAcuracy: true,
      timeout: 3000,
      maximumAge: 200
    };
    return navigator.geolocation.getCurrentPosition(function(position) {
      var newLatLng;
      newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      return gmapobj.setCenter(newLatLng);
    }, function() {
      return false;
    }, opts);
  } else {
    return false;
  }
};

$map = $('#map');

initialPosition = new google.maps.LatLng(35.127152, 138.910627);

myOptions = {
  noClear: true,
  center: initialPosition,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

map_canvas = new google.maps.Map($map[0], myOptions);

base = "http://www.biodic.go.jp/trialSystem/LinkEnt/nps/";

NPs = {
  "利尻礼文サロベツ": "NPS_rishirirebunLinkEnt.kml",
  "知床": "NPS_shiretokoLinkEnt.kml",
  "阿寒": "NPS_akanLinkEnt.kml",
  "釧路湿原": "NPS_kushiroLinkEnt.kml",
  "大雪山": "NPS_daisetsuzanLinkEnt.kml",
  "支笏洞爺": "NPS_shikotsutouyaLinkEnt.kml",
  "十和田八幡平": "NPS_towadahatimantaiLinkEnt.kml",
  "三陸復興": "NPS_sanrikufukkouLinkEnt.kml",
  "磐梯朝日": "NPS_bandaiasahiLinkEnt.kml",
  "日光": "NPS_nikkouLinkEnt.kml",
  "尾瀬": "NPS_ozeLinkEnt.kml",
  "秩父多摩甲斐": "NPS_chichibutamaLinkEnt.kml",
  "小笠原": "NPS_ogasawaraLinkEnt.kml",
  "富士箱根伊豆": "NPS_fujihakoneizuLinkEnt.kml",
  "南アルプス": "NPS_southalpsLinkEnt.kml",
  "上信越高原": "NPS_joshinetsuLinkEnt.kml",
  "中部山岳": "NPS_chubusangakuLinkEnt.kml",
  "白山": "NPS_hakusanLinkEnt.kml",
  "伊勢志摩": "NPS_iseshimaLinkEnt.kml",
  "吉野熊野": "NPS_yoshinokumanoLinkEnt.kml",
  "山陰海岸": "NPS_saninkaiganLinkEnt.kml",
  "瀬戸内海": "NPS_setonaikaiLinkEnt.kml",
  "大山隠岐": "NPS_daisenLinkEnt.kml",
  "足摺宇和海": "NPS_ashizuriuwakaiLinkEnt.kml",
  "西海": "NPS_nishikaiLinkEnt.kml",
  "雲仙天草": "NPS_unzenamakusaLinkEnt.kml",
  "阿蘇くじゅう": "NPS_asokujuLinkEnt.kml",
  "霧島錦江湾": "NPS_kirishimakinkowanLinkEnt.kml",
  "屋久島": "NPS_yakushimaLinkEnt.kml",
  "西表石垣": "NPS_iriomoteishigakiLinkEnt.kml",
  "慶良間諸島": "NPS_fkeramashotouLinkEnt.kml"
};

selectbox = $('#select-np');

for (key in NPs) {
  value = NPs[key];
  selectbox.append($("<option value='" + value + "'>" + key + "</option>"));
}

moveToCurrentPosition(map_canvas);

selectbox.change(function() {
  var kmlLayer, kmlurl;
  if (kmlurl !== "") {
    kmlurl = base + $(this).val();
    kmlLayer = new google.maps.KmlLayer(kmlurl);
    return kmlLayer.setMap(map_canvas);
  }
});
