/* eslint-disable */
import '@babel/polyfill';
import{ login, logout} from './login';
import {displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
// import { bookCar } from './stripe';

///DOM Element

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
// const bookBtn = document.getElementById('book-car');
// // console.log(bookBtn);

/////////// DELEGATION //////////////////////////////////
if (mapBox){
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

if (loginForm)
    loginForm.addEventListener('submit', (e) => {
        console.log(email, password);

    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Upadting...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, confirmPassword }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value;
    document.getElementById('password').value;
    document.getElementById('password-confirm').value;
  }); 

  // document.addEventListener('DOMContentLoaded', () => {
  //   const bookBtn = document.getElementById('book-car');
// if (bookBtn) {
//   bookBtn.addEventListener('click', (e) => {
//     e.target.textContent = 'Processing...';
//     const { carId } = e.target.dataset;
//     bookCar(carId);
//     });
//   }
  // });