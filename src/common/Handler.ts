import { loginStore } from './../modules/authen/loginStore';
import { callApi } from './../utils/callAPI';
import { numberWithCommas } from './BaseFunction';
import { Moment } from "./Moment";
// import * as Config from "../contants/config"
import StorageService from '../utils/storageService';

export const setPercent = (a: number, b: number) => {
  // a hiện tại, b : quá khứ
  if (a === b) return 0;
  else if (a === 0) { return -100; }
  else if (b === 0) { return 100; }
  else {
    let percent: number = 0;
    percent = 100 * (a - b) / b;
    if (percent - Math.floor(percent) >= 0.95 || percent - Math.floor(percent) <= 0.05 || percent === Math.floor(percent)) {
      return Math.ceil(percent);
    } else {
      return percent.toFixed(1);
    }
  }
}

export const setLabels = (arr: any) => {
  // chủ nhật là 0, thu 2 là 1, thu 3 là 2,...
  //let days: String[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let months: String[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let labels: String[] = [];
  arr?.map((item: any) => {
    let date = new Date(item.date);
    labels.push(`${months[date.getMonth()]} ${date.getDate()}`);
    // labels.push(this.days[new Date(item.date).getDay()]);
    return null;
  });
  return labels;
};

export const setDay = (arr: any) => {
  let day: String[] = [];
  arr?.map((item: any) => {
    let date = Moment.getDate(new Date(item.date).getTime(), "dd-mm-yyyy");
    day.push(date);
  })
  return day;
}

export const setTotal = (arr: any[], str: String) => {
  let data: number[] = [];
  let sum: number = 0;
  arr?.map((item: any) => {
    data.push(item[`${str}`])
    return null;
  })
  if (data.length > 0)
    sum = data?.reduce((sum: number, item: any) => sum + item)
  return sum;
}

export const setData = (arr: any[], str: String) => {
  let data: number[] = [];
  arr?.map((item: any) => {
    data.push(item[`${str}`])
    return null;
  });
  return data;
};

export const setColorLine = (data: any, label: String, str: String) => {
  if (label === "BID") {
    label = "AUCTION";
  };
  let object = {
    data: data,
    label: `${label}`,
    borderColor: `${str}`,
    fill: false,
    tension: 0,
    pointBackgroundColor: `${str}`
  }
  return object;
}

export const setOptionsLine = {
  title: {
    display: true,
  },
  legend: {
    display: true,
    position: "bottom",
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: function(value: any) {
          if (value % 1 === 0) return numberWithCommas(value);
        }
      }
    }],
    xAxes: [
      {
        gridLines: {
          color: "#fff"
        },
      },
    ],
  },
  tooltips: {
    // bodyFontSize: 15,
    bodySpacing: 10,
    caretSize: 3,
    caretPadding: 5,
    callbacks: {
      label: function(tooltipItem: any, data: any) {
        var label = data.datasets[tooltipItem.datasetIndex].label || '';

        if (label) {
            label += ': ';
        }
        label += numberWithCommas(tooltipItem.value);
        return label;
        
      }
    }
  }
}

export const validate = (name: string, value: string, error: any) => {
  if (name === "email") {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const check = regex.test(value) || vnf_regex.test(value) ? false : true;
    // if (!regex.test(value) || !vnf_regex.test(value)) {
    if (check) {
      error.email =
        "Tài khoản phải là Email hoặc số điện thoại (Sđt gồm 10 số)";
    } else {
      error.email = "";
    }
  }
  if (name === "name") {
    if (value.trim().length < 6) {
      error.name = "Phải có ít nhất 6 ký tự"
    } else {
      error.name = ""
    }
  }
  if (name === "password") {
    if (value.trim().length < 8) {
      error.password = "Mật khẩu dài hơn 8 kí tự";
    } else {
      error.password = "";
    }
  }
}

export async function updateFcmToken() {
  // if (localStorage.getItem('notification-permission') === "1") {
  //     let fcmToken: string | null = localStorage.getItem('fcm-token');
  //     if (!fcmToken) {
  //         fcmToken = await messaging.getToken();
  //         localStorage.setItem('fcm-token', fcmToken as string);
  //     }
  //     await service.updateFcmToken(fcmToken as string);
  // }
}
export async function logOut() {
  // const url: string = (window as any).REACT_APP_API_AUTH + 'logout';
  // const result = await deleteRequest(url, {
  //     fcmToken: localStorage.getItem('fcm-token')
  // });
  const resultApi = await callApi(
    "/v1/auth/logout",
    "DELETE",
    { fcmToken: localStorage.getItem('fcm-token') },
    true)
  if (resultApi.result.status < 300) {
    loginStore.user = null;
    StorageService.removeToken();
    StorageService.removeRefreshToken();
    window.location.href = "/";
  }
}