import { dbank } from "../../declarations/dbank";

addEventListener('load', async () => {
  update();
});

document.querySelector('form').addEventListener('submit',async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector('#submit-btn');
  const inputAmt = parseFloat(document.getElementById('input-amount').value);
  const withdrawlAmt = parseFloat(document.getElementById('withdrawl-amount').value);

  btn.setAttribute('disabled', true);

  if(document.getElementById('input-amount').value.length != 0){
    await dbank.topUp(inputAmt);
  }
  if(document.getElementById('withdrawl-amount').value.length != 0){
    await dbank.withdraw(withdrawlAmt);
  }

  await dbank.compound();

  update();

  btn.removeAttribute('disabled');
  document.getElementById('input-amount').value = '';
  document.getElementById('withdrawl-amount').value = '';
});

async function update(){
  const currentAmt = await dbank.checkBalance();
  document.getElementById('value').innerText = currentAmt.toFixed(2);
}