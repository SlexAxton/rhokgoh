define(function () {
  return (function (d) {
    var offset = d.getTimezoneOffset();
    if (offset === 0) {
      return '';
    }
    var out = 'T00:00:00';
    var hour;
    var remain;
    if (offset > 0) {
      out += '-';
    }
    else {
      out += '+';
    }

    hour = offset / 60;
    remain = offset % 60;

    if (hour < 10) {
      hour = '0'+hour;
    }
    if (remain < 10) {
      remain = '0'+remain;
    }
    return out+hour+remain;
  })(new Date());
});
