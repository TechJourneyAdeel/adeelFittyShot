// valid quantity input Value 
quantity = () => {
    // const cardLists = document.querySelectorAll('.card-list');
    // let price = document.querySelectorAll('.card-price span:first-child');

    // // Save Quantity 
    // const quantitySelect = document.querySelectorAll('select');
    // // let test = Array.from(quantitySelect).map((val) => val.value)
    // quantitySelect.forEach((item, ind) => {
    //   item.addEventListener('change', () => {
    //     let val = []
    //     val.push(item.value);
    //     console.log(`${val}`)
    //     localStorage.setItem('quantity', JSON.stringify(val));
    //   })
    //   const quantityNum = JSON.parse(localStorage.getItem('quantity'));
    //   console.log(quantityNum)
    //   item.value = quantityNum[ind] || '';
    // })
    // const quantitySelect = document.querySelectorAll('select');
    // quantitySelect.forEach((item, ind) => {
    //   item.addEventListener('change', () => {
    //     let test = Array.from(quantitySelect).map((val) => val.value);
    //     console.log(`first ${test}`);
    //     let val = item.value;
    //     test[ind] = val;
    //     console.log(`last ${test}`);
    //     localStorage.setItem('quantity', JSON.stringify(test));
    //   });
    //   const quantityNum = JSON.parse(localStorage.getItem('quantity'));
    console.log(quantityNum);
    //   item.value = quantityNum[ind] || ''; // Set initial value, or an empty string if not present
    // });
    price.forEach((list, ind) => {

        const priceToNumber = Number(list.innerText.replace(/[^\d.]/g, ''));

        quantitySelect[ind].addEventListener('change', () => {
            const quantityTotal = priceToNumber * Number(quantitySelect[ind].value);
            list.innerText = `$${quantityTotal}`;

            totalPrice();
        });

    });
};
