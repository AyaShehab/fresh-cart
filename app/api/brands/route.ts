import { NextRequest, NextResponse } from "next/server";

export function GET(req : NextRequest){
return NextResponse.json({
    message:'success',
    count:5,
    allProducts:[
        {name:'Nokia'}
    ]
})
}