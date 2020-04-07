import axios from 'axios'

export const register = newUser => {
    return axios
      .post('http://localhost:5000/users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
      })
      .then(response => {
        console.log('Registered')
      })
  }

export const login = user => {
  console.log("inside login")
    return axios
      .post('http://localhost:5000/users/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log("got response "+response.data)
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }

// export const getProfile = () => {

//   // console.log('herrrr!!!!!   .....  '+localStorage.usertoken)

// return axios
//     .get('http://localhost:5000/users/profile', {
//     headers: { "authorization": localStorage.usertoken }
//     })
//     .then(response => {
//     return response.data
//     })
//     .catch(err => {
//     console.log(err)
//     })
// }