'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const diplayMovements = function (movements) {
  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>

      <div class="movements__value">₹${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Displaying Current Balence:
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `₹${acc.balance} `;
};
calcDisplayBalance(account1);

//using forEach() and Map() methods

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNames(accounts);

//calculation account Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `₹${incomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);

  labelSumOut.textContent = `₹${out}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `₹${interest}`;
};
// calcDisplaySummary(account1.movements);

//Event Handeler:
let currentAccount;

//Event Handelers:
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //this will prevent this form from submitting
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Wlcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clearing input fields:
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    //Display Balance
    calcDisplayBalance(currentAccount);
    //Display Summary
    calcDisplaySummary(currentAccount);
    //Display movements
    diplayMovements(currentAccount.movements);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => (acc.userName = inputTransferTo.value)
  );
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// let arr = ['a', 'b', 'c', 'c', 'd', 'e'];

// //slice method:
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));

// //splice method: it mutates the array
// arr.splice(2, 2, 'f', 'g', 'h');
// console.log(arr);

// //Reverse
// arr = ['a', 'b', 'c', 'd'];
// const arr2 = ['h', 'g', 'f', 'e'];
// arr2.reverse();
// //reverse also mutates the original array
// console.log(arr2);

// //Join
// const letters = arr.concat(arr2);

// console.log(letters.join(' - '));

// //array 'at' method - it also works on strings

// console.log(arr.at(0));
// console.log(arr.at(-1));

// //forEach Method:
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else console.log(`You deposited ${Math.abs(movement)}`);
// }

// console.log('--------FOR EACH-------');

// movements.forEach(function (movement, i, array) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} You deposited ${movement}`);
//   } else console.log(`Movement ${i + 1} You deposited ${Math.abs(movement)}`);
// });

//for each on a map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//*Challenge 1:

/*Coding Challenge #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
*/
// let julia = [3, 5, 2, 12, 7];
// console.log(julia.slice(1, -2));

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctDogsJulia = dogsJulia.slice(1, -2);
//   const totalDogs = [...correctDogsJulia, ...dogsKate];
//   totalDogs.forEach(function (dog, i, arr) {
//     const age = dog < 3 ? 'still a puppy' : 'an adult';
//     console.log(`Dog number ${i + 1} is ${age}`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('**********************SECOND DATA***********************');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// //*My own practice:
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// const newMsvi = movements.map(function (movement, i) {
//   if (movement > 0) {
//     return `Movement ${i + 1} You deposited ${movement}`;
//   } else return `Movement ${i + 1} You deposited ${Math.abs(movement)}`;
// });
// console.log(newMsvi);
// console.log(movements);

// const euroToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * euroToUsd);

// const newMD = movements.map(
//   (movement, i) =>
//     //refactor
//     `Movement ${i + 1} You ${
//       movement > 0 ? 'deposited' : 'withdrew'
//     } ${movement}`

//   // if (movement > 0) {
//   //   return `Movement ${i + 1} You deposited ${movement}`;
//   // } else return `Movement ${i + 1} You withdrew ${Math.abs(movement)}`;
// );

// console.log(newMD);

// //working with filter() method (learning):

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// const withdrawal = movements.filter(mov => mov < 0);
// console.log(withdrawal);

// //working with reduce() method (Learing):
// const balance = movements.reduce(
//   (acc, cur) => acc + cur,
//   0 /*this is initial accumulator value*/
// );

// console.log(balance);

// //Maximum Value
// const max = movements.reduce(
//   (
//     acc,
//     mov /*{
//   if (acc > mov) {
//     return acc;
//   } else return (acc = mov);
// }*/
//   ) => (acc > mov ? acc : (acc = mov)),
//   movements[0]
// );

// console.log(max);

//Chaining Methods:

//conversion to USD and summing the depasites:

// console.log(movements);

// const euroToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// //The find Method:
// const firstWithdrawal = movements.find(function (mov) {
//   return mov < 0;
// });
// console.log(firstWithdrawal);

// //another Example:
// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// //using for of loop:

// const accFor = function (accounts) {
//   for (let account of accounts) {
//     if (account.owner === 'Jessica Davis') {
//       return account;
//     }
//   }
// };

// console.log(accFor(accounts));

//*Challenge 2 & 3 comibined
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know 
from other challenges how we calculate averages �)

4. Run the function for both test datasets

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = function (dogsAge) {
//   const adults = dogsAge
//     .map(age => (age > 2 ? 16 + age * 4 : age * 2))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(adults);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
