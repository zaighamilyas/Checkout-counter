
document.addEventListener('DOMContentLoaded', (event) => {
  displayParams();
  checkout();
  //createDiscountDiv();
});
function checkout() {
  const storeConfig = {
    cartItems: [
      {
        price: ' $1000',
        description: 'Mobile phone',
        name: 'iphone Xs'
      },
      {
        price: '$1600',
        description: 'Mobile phone',
        name: 'iPhone Xs Max'

      },
      {
        price: '$1800',
        description: 'Mobile phone',
        name: 'iphone Xs Max plus'

      }
    ],
  };
  //console.log(storeConfig );

  iphone_names = document.getElementsByClassName("name");
  descriptions = document.getElementsByClassName("description");
  prices = document.getElementsByClassName("price");
  totals = document.getElementsByClassName("total");

  var i;
  for (i = 0; i < storeConfig.cartItems.length; i++) {
    iphone_names[i].innerHTML = storeConfig.cartItems[i].name;
    descriptions[i].innerHTML = storeConfig.cartItems[i].description;
    prices[i].innerHTML = storeConfig.cartItems[i].price;
    totals[i].innerHTML = storeConfig.cartItems[i].price;
  }


  document.getElementById("subtotal").innerHTML = "$" + (parseFloat(storeConfig.cartItems[0].price.replace("$", '')) + parseFloat(storeConfig.cartItems[1].price.replace("$", '')) + parseFloat(storeConfig.cartItems[2].price.replace("$", '')));
  document.getElementById("shipping").innerHTML = "$0";


  if (document.getElementById("discountElement").innerHTML == "") {
    document.getElementById("discountElement").style.display = "none";
    document.getElementById("discountPara").style.display = "none";
  }

  if (document.getElementById("grandTotal").innerHTML == "") {
    document.getElementById("grandTotal").innerHTML = document.getElementById("subtotal").innerHTML;
  }

  //document.getElementById("grandTotal").innerHTML = document.getElementById("subtotal").innerHTML;
  //document.getElementById("grandTotal").innerHTML = "$" + (parseFloat(storeConfig.cartItems[0].price.replace("$", '')) + parseFloat(storeConfig.cartItems[1].price.replace("$", '')) + parseFloat(storeConfig.cartItems[2].price.replace("$", '')));

}

function displayParams() {
  const params = new URLSearchParams(window.location.search);

  for (const param of params) {
    //alert(param);
  }


}

var myVar, y;
//var x = document.getElementById("txtCoupon").value;
const params = new URLSearchParams(window.location.search);
  var showPromoButtonVar = params.get("applyPromoCode");
   if (showPromoButtonVar == "true")  {
    document.getElementById("txtCoupon").style.display = "none";
    document.getElementById("ApplyCouponButton").style.display = "none"; 
    
   }
   else if (showPromoButtonVar == "false")  {   
    document.getElementById("showPromoId").style.display = "none";

   }

   
   function showPromoButton() {
    document.getElementById("txtCoupon").style.display = "block";
    document.getElementById("ApplyCouponButton").style.display = "block"; 
  
   }
function couponClick() {
  const params1 = new URLSearchParams(window.location.search);
  var str1 = params1.get("ajaxDelayMs");


  myVar = setTimeout(secondCall, str1);
  //document.getElementById("txtCoupon").style.display = "none";
}


function actualFunction(y) {

  const params = new URLSearchParams(window.location.search);//(Params becomes an array of all the parameters)
  //console.log(params);
  var str = params.get("coupons");//Picks everything in coupon parameter only and leaves other parameters.
  //str saves everything in a string form.Which is SAVE20:20,SAVE40:40.Its in string format.
  var couponArray = str.split(","); //It creates an array of the string split in two.
  //The coupon array stores Array[0] as save20:20 and array[1] as save 40:40.
  //console.log(couponArray);


  const couponsList = [];

  var traverse;
  for (index = 0; index < couponArray.length; index++) {

    var transverse = (couponArray[index]);//It first assigns the value of first array element that is save20:20 to traverse and then in second loop the first array value is erased and traverse is assigned the second array value that is save40:40. 

    var secondSplit = transverse.split(":");//It first takes in save20:20 during the first loop and saves it in traverse
    //and the split method is applied on traverse values(save20:20)and it changes to save20,20 and then 
    //which is an array and then the traverse is erased and the second save40:40 value is saved to it which is 
    // which is again processed by split and is saved in second split as an array that is [save40,40] 

    var couponObject = {
      coupon: secondSplit[0],
      percentage: secondSplit[1]
    };//once the first loop runs and save20,20 is saved in secondsplit then this being an array the
    //the first element that is zeroth element of this array is saved in coupon because of secondsplit[0]
    //and the second element of array is stored in perecentage that is 20.now one object is created and stored in couponObject
    //then again on second loop the second object is created and stored in couponObject.
    //Hence two objects are stored in couponObject.
    couponsList.push(couponObject)   //it pushes one object on creation in first loop to copuon list and then couponobject is overwritten and second object is created and stored in
    //couponList array.So couponList array contains two objects .                



  }

//alert(y.length);
  const getObject = couponsList.find(couponsList => couponsList.coupon === y[y.length-1]);

 console.log(getObject);
  var sum = JSON.parse(localStorage.getItem('sum'));
  var refresh = params.get("pageRefreshOnCouponApply");


  if (getObject) {
    alert("Coupon is valid and you will save " + ((getObject.percentage * 0.01) * sum) + " dollars ");
   window.localStorage.setItem('coupon', JSON.stringify(y));
   var i;
  for (i = 0; i < y.length ; i++) {
    createAdditionalDivs(i);
  }
   // alert(coupon);
    const params = new URLSearchParams(window.location.search);
    var inputBoxShow = params.get("showCouponInputWhenCouponIsApplied");
    if (inputBoxShow == "false") {
      document.getElementById("txtCoupon").style.display = "none";
      document.getElementById("ApplyCouponButton").style.display = "none";
    }
    else {
      document.getElementById("txtCoupon").style.display = "block";
      document.getElementById("ApplyCouponButton").style.display = "block";

    }
    const paramsDiff = new URLSearchParams(window.location.search);
    var showMultipleCoupons = paramsDiff.get("multipleCouponSupport");
    if (showMultipleCoupons == "true")   { 
      document.getElementById("txtCoupon").style.display = "block";
      document.getElementById("ApplyCouponButton").style.display = "block";
     }
                   

    document.getElementById("discountElement").innerHTML = ((getObject.percentage * 0.01) * sum);
    var grandTotalDiscounted = sum - ((getObject.percentage * 0.01) * sum);
    document.getElementById("grandTotal").innerHTML = grandTotalDiscounted;
    
  }
  else {
    alert("Coupon is invalid.Try any other coupon");
    document.getElementById("discountElement").style.display = "none";
    document.getElementById("discountPara").style.display = "none";
    window.localStorage.removeItem('coupon');   
    window.localStorage.removeItem('user');   
    y.pop();
  }
}



function changeValue() {
  var grandTotalDiscounted = sum - ((getObject.percentage * 0.01) * sum);
  document.getElementById("grandTotal").innerHTML = grandTotalDiscounted;

}

function getCoupon() {
  var coupon = JSON.parse(localStorage.getItem('coupon'));
  
  return coupon;

}


function createAdditionalDivs(i) {
  var item = "user";
 
  if (getCoupon() ) {
    item = "coupon";         
  }
//alert(coupon);
  var div = document.createElement("div");

  div.style.width = "100%";
  div.style.height = "100%";

  var newlabel = document.createElement("Label");
  //newlabel.id = "lblDisplay_" + i;
 let retrieving = JSON.parse(localStorage.getItem(item));
//alert(retrieving);
 //alert(y.length);
 //alert(i);
 //alert(retrieving[i]);
  newlabel.innerHTML = "Coupon applied: " + retrieving[i] ;

  div.appendChild(newlabel);

  div.id = "removeBtnDiv_" + i;

  document.getElementById("txtCoupon").parentElement.appendChild(div);

  const params = new URLSearchParams(window.location.search);
  var removePermission = params.get("codesCanBeRemoved");
  if (removePermission == "true") {          

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Remove";
    //btn.id = "btnRemove";

    btn.addEventListener("click", function () {
      //alert(i);
      //this.closest("span").remove();
      document.getElementById("removeBtnDiv_" + i).remove();
      var couponArray = JSON.parse(localStorage.getItem('coupon'));
     couponArray.splice(i,1);
     //alert(couponArray);
      //alert(couponArray);

      localStorage.setItem('coupon',JSON.stringify(couponArray));
      //localStorage.setItem('user',JSON.stringify(couponArray));
      //localStorage.removeItem('coupon');
      localStorage.removeItem('user');
      const params = new URLSearchParams(window.location.search);
      var refreshOnRemove = params.get("pageRefreshOnCouponRemove");
      if (refreshOnRemove == "true") {
        window.location.reload();
      }

    });

    div.appendChild(btn);
  }

}
//function createDiscountDiv() {
  //var div = document.createElement("div");
  //var discountLabel = document.createElement("Label");
  //discountLabel.id = "lblDiscount";

  //discountLabel.innerHTML = "Coupon applied: " + localStorage.getItem(item);
  //div.appendChild(discountLabel);
  //document.getElementById("shipping").insertAdjacentElement(div);//parentElement.appendChild(div);
  //document.getElementById("discountLabel").insertBefore(document.getElementById("grandTotal"));


//}


function loadUser() {

  var user = JSON.parse(localStorage.getItem('user'));
  //console.log(user);
  var cpn = getCoupon();
  //document.getElementById("grandTotal").innerHTML = sum; 
//alert(user);
//alert(cpn);
  

if (user) {
    
  actualFunction(user);
}

else if (cpn) {
    for (i = 0; i < cpn.length ; i++) { 
    createAdditionalDivs(i);
    //alert("here");
    }
  }
  
  
}

function secondCall() {   
  var x = document.getElementById("txtCoupon").value;
  var forCheckingValue = localStorage.getItem("user");

  if (forCheckingValue  && forCheckingValue != "undefined" ) {  
   //alert(forCheckingValue); 
  var user = JSON.parse(forCheckingValue);
  var first = user.find(myFunction);

  //alert(first);
  if (x != first) {
    
  user.push(x);
  localStorage.setItem("user", JSON.stringify(user));
    }
  }

  else  {
    
    var couponsApplyArray = []; 
    couponsApplyArray.push(x); 
    localStorage.setItem("user", JSON.stringify(couponsApplyArray));
  }

  function myFunction(value, index, array) {
    return value == x;
  }

  
  //console.log(couponsApplyArray);
  var sum = document.getElementById("subtotal").innerHTML.replace("$", '');
  const params = new URLSearchParams(window.location.search);
  var refresh = params.get("pageRefreshOnCouponApply");
                             
  
  if (refresh == "true") {
    //localStorage.setItem("user", JSON.stringify(couponsApplyArray));
    //window.localStorage.setItem('user', JSON.stringify(x));

    window.localStorage.setItem('sum', JSON.stringify(sum));
    window.location.reload();
                   
  }
  else {

    actualFunction(user);

  }

}


loadUser();