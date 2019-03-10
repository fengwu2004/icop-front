import { param2Obj } from '@/utils'
import {queryPopedomList} from "@/api/login";

let base64image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUACgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD37cu/bn5sZxUMl5BFdw2ryYmn3eWuD82Bk89KHTfPjOCEyD+NYWsJcXGv6THBP9mnxMBJsD4+X0PXI/nUxleVmaQgpPU3pbuCCeGCSTbJNkRjB+bHX+dVtQ1nT9KimlvbjykhRXkOxm2gttHQHua5rW49RsdQ06W4v/tjKXdB5Kx7du0np1zj9KreK2F14J17UO08sSxk/wBxZEA/rSpycsVGg+rX3dfxOWU5Rrql31+Wv6r8TqNI8S6RrryJpt6s7xjLLsZSB64YDiisPQvta+Mrt9f8mPVXthHbC3UiGSEHc20nksD1B5A9qK6a9OMJ2jt/XXQ3krM7DAznAz601oYnlSVokaSPOxyoJXPXB7UUViISW3gmZWlhjkZQQpdQSARg4+opkljaTWhtJbWB7Y9YWjBQ85+70680UULR36hbW46W2gneJ5oI5GibfGzoCUb1GehoooouB//Z'

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}

const userMap = {
  admin: {
    pepodomIds: "301100,301200,301400,301500,301600,301760",
    userToken: 'admin',
    id:'admin001',
    telephone:'12933333333',
    userName: 'Super Admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  },
  editor: {
    pepodomIds: "301100,301200,301400,301500,301600,301760",
    userToken: 'admin',
    id:'admin002',
    telephone:'12933333333',
    userName: 'Super Admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  }
}

export default {
  login: config => {
  
    console.log('zzzz')
    const { userName } = param2Obj(config.url)
    
    console.log('登陆名' + userName)
    
    return {
      respData:userMap['admin']
    }
  },
  editPwd: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success',
  validPic: () => {
    
    return {
      outputStream:base64image
    }
  },
  queryPopedomList: () => {
    
    return {
      respData:'110000,100000,112000,120000,121000,121100,121200,121300,121400,121500,122000,122100,122200,122300,122400,122500,122600,122700'
    }
  },
}
