const testPhone = (number) => /^1[3-8]\d{9}$/.test(number);

const showModal = (opt, title, cb) => {
  //do
  let showOpt = {
      content: "",
      showCancel: false,
  }

  if(typeof opt == 'object') {

      wx.showModal(opt);
      return;
  }

  if(typeof opt == 'string') {
      showOpt.content = opt;

      if(title && typeof title == 'string') {
          showOpt.title = title;
         
          if(cb && typeof cb == 'function') {
            
              showOpt.success = cb;
          }
      }

      if(title && typeof title == 'function') {
          showOpt.success = title;
      }
  }

  wx.showModal(showOpt);
}


const success = (msg = '成功') => {
  wx.showToast({
    title: msg,
    icon: 'success',
    mask:true
  })
}

const createWait = (msg = '请稍后') => {
  wx.showToast({
    title: msg,
    icon: 'loading',
    mask: true,
    duration:10000
  })
}

const closeWait = wx.hideToast;

module.exports = {
  showModal,
  success,
  createWait,
  closeWait,
  testPhone,
  getCaptchaUrl
}
