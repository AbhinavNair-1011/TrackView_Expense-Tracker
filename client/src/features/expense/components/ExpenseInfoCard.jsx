import React from 'react';


const ExpenseInfoCard = () => {
    return (
        <div className="space-y-20 mb-10">


            <div className=" text-black p-5 ">
                <blockquote className="text-center italic">
                    <p className="text-lg">"Beware of little expenses. A small leak will sink a great ship."</p>
                    <footer className="mt-2 text-sm opacity-80">— Benjamin Franklin</footer>
                </blockquote>
            </div>

        </div>
    );
};

export default React.memo(ExpenseInfoCard);