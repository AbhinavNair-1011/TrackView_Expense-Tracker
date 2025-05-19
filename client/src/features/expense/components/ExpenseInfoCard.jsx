import React from 'react';


const ExpenseInfoCard = () => {
    return (
        <div className="space-y-20 mb-10">


            <div className="bg-gradient-to-r from-slate-300 to-slate-400 text-black p-5 rounded-xl shadow ">
                <blockquote className="text-center italic">
                    <p className="text-lg">"Beware of little expenses. A small leak will sink a great ship."</p>
                    <footer className="mt-2 text-sm opacity-80">— Benjamin Franklin</footer>
                </blockquote>
            </div>

        </div>
    );
};

export default ExpenseInfoCard;