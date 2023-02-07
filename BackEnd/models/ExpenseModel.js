const { Double, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const express=require("express");

const ExpenseSchema= ({
    unitprice:{
        type: Decimal128,
        required: true
    },
    itemname:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    quantity:{
        type: Decimal128,
        required: true
    },
    total:{
        type: Decimal128,
        required: true,
        default: function() {
            return this.quantity * this.unitprice
          }
        
    },
    user:{
        type: String,
        required: true

    },
    datecreated:{
        type: Date,
        required: true,
        //default: Date.now
        default: Date.now
       
    },
    datestring:{
        type:String,
        required: true,
        default: function(){
            var date= this.datecreated
            return date;
        }
    },
    datestring2:{
        type:String,
        required: true,
        default: function(){
            var date2= this.datestring.slice(4,15)
            return date2;
           
        }
    }      
    
})

const ExpenseModel = mongoose.model('expenses', ExpenseSchema);
module.exports = ExpenseModel;