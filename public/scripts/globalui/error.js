define(['window'], function (window) {
  return {
    dataError : function (msg) {
      msg = msg || 'There was an error.';

      window.alert(msg);
    }
  };
});
