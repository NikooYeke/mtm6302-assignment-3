let drpYear = document.getElementById('year')
let drpMonth = document.getElementById('month')
let drpDay = document.getElementById('day')

let xTime = null;

let futureDateView = document.getElementById('future-date')
let countdownView = document.getElementById('countdown')

function generateYear(){

  let min = new Date().getFullYear();
  max = min + 20;
  
  for (let i = min; i<=max; i++){
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      drpYear.appendChild(opt);
  }
    // select.value = new Date().getFullYear();
}

function generateDay(){
  let day_selected = (new Date).getDate();
  for (let i = 1; i < 32; i++){
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    opt.selected = i === day_selected ? ' selected' : '';
    
    drpDay.appendChild(opt);
  }
}

function showDateForm(){
  

  futureDateView.style.display = "block";
  countdownView.style.display = "none";

  generateYear()
  generateDay()

  
const btnSetDate = document.getElementById('btnsetdate');

  btnSetDate.addEventListener('click', function(){

    let fd = new Date();
    fd.setFullYear(drpYear.value, drpMonth.value, drpDay.value)
    // console.log(fd)

    // save future date to local storage as a date object
    window.localStorage.setItem('futureDate', fd)
    if(xTime !== null){
      clearInterval(xTime)
    } 
    showCoundownTimer()

  })

}

function showCoundownTimer(){
  futureSateView.style.display = "none";
  countdownView.style.display = "block";
  // Set the date we're counting down to
  let fd = new Date(window.localStorage.getItem('futureDate'))
  console.log(fd, typeof fd)
  // let countDownDate = new Date(fd.getFullYear(), fd.getMonth(), fd.getDay(), 0, 0, 0).getTime();
  let countDownDate = new Date(fd.getFullYear(), fd.getMonth(), fd.getDay(), 0, 0, 0).getTime();

  // Update the count down every 1 second
  xTime = setInterval(function() {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
    document.getElementById("days").innerHTML = days + "d "
    document.getElementById("hours").innerHTML = hours + "h " 
    document.getElementById("mins").innerHTML = minutes + "m " 
    document.getElementById("secs").innerHTML = seconds + "s "     

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(xTime);
        document.getElementById("countdown").innerHTML = "EXPIRED";
      }
  }, 1000);

  const btnResetDate = document.getElementById('btnreset');
  btnResetDate.addEventListener('click', function(){

    window.localStorage.removeItem('futureDate')
    showDateForm();

  })
    
}

function init(){
  if(window.localStorage.getItem('futureDate') === null){
    showDateForm();
  }else{
    showCoundownTimer();
  }
}
