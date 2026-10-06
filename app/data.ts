export type Event = { year:string; title:string; slug:string; summary:string; place:string; lat:number; lng:number; status:"seed"|"research" }

export const events:Event[] = [
 {year:"c. 2500 BCE",title:"Kerma emerges",slug:"kerma",summary:"An early Nile-centred urban and political centre develops in Upper Nubia.",place:"Kerma",lat:19.6,lng:30.4,status:"seed"},
 {year:"c. 750 BCE",title:"Kush rises",slug:"kush",summary:"The Kingdom of Kush becomes a major power in the Nile Valley.",place:"Nubia",lat:18.0,lng:31.0,status:"seed"},
 {year:"c. 300 BCE",title:"Meroë becomes central",slug:"meroe",summary:"Meroë becomes a major centre of Kushite political and economic life.",place:"Meroë",lat:16.94,lng:33.75,status:"seed"},
 {year:"1821",title:"Turco-Egyptian conquest",slug:"turco-egyptian-conquest",summary:"Egyptian-Ottoman forces establish control over much of Sudan.",place:"Khartoum region",lat:15.5,lng:32.56,status:"seed"},
 {year:"1881",title:"Mahdist Revolution",slug:"mahdist-revolution",summary:"Muhammad Ahmad declares himself Mahdi, beginning a movement that reshapes Sudanese politics.",place:"Sudan",lat:14.5,lng:32.5,status:"seed"},
 {year:"1956",title:"Sudan becomes independent",slug:"independence-1956",summary:"Sudan becomes an independent state on 1 January 1956.",place:"Khartoum",lat:15.5,lng:32.56,status:"seed"},
 {year:"2019",title:"Revolution and transition",slug:"2019-revolution",summary:"Mass protests contribute to the fall of Omar al-Bashir and a subsequent political transition.",place:"Khartoum",lat:15.5,lng:32.56,status:"research"},
 {year:"2023",title:"War begins",slug:"2023-war",summary:"Fighting between the Sudanese Armed Forces and Rapid Support Forces begins in April 2023 and expands across the country.",place:"Khartoum",lat:15.5,lng:32.56,status:"research"},
];

export const places = [
 {name:"Kerma",slug:"kerma",lat:19.6,lng:30.4,period:"Ancient Sudan"},
 {name:"Meroë",slug:"meroe",lat:16.94,lng:33.75,period:"Kush"},
 {name:"Khartoum",slug:"khartoum",lat:15.50,lng:32.56,period:"Modern Sudan"},
 {name:"Omdurman",slug:"omdurman",lat:15.65,lng:32.48,period:"Modern Sudan"},
 {name:"Port Sudan",slug:"port-sudan",lat:19.62,lng:37.22,period:"Modern Sudan"},
];

export type Rel = { from:string; to:string; type:"preceded"|"contributed_to"; confidence:"direct"|"context"|"contested"; note:string };
export const relations:Rel[] = [
 {from:"kerma",to:"kush",type:"preceded",confidence:"context",note:"Kerma is an earlier Nubian centre; scholars debate how directly it connects to the rise of Kush."},
 {from:"kush",to:"meroe",type:"preceded",confidence:"context",note:"Meroë developed as a centre within the Kushite kingdom."},
 {from:"turco-egyptian-conquest",to:"mahdist-revolution",type:"contributed_to",confidence:"context",note:"The Mahdist movement arose in opposition to Turco-Egyptian rule; historians weigh religious, economic and administrative grievances differently."},
 {from:"2019-revolution",to:"2023-war",type:"preceded",confidence:"contested",note:"Analysts disagree on how directly the 2019 transition shaped the 2023 conflict. Recorded as context, not proven causation."},
];
export const relLabel = {preceded:"Preceded", contributed_to:"Contributed to"} as const;
export const confLabel = {direct:"Direct, well-evidenced", context:"Broader context", contested:"Contested interpretation"} as const;
export const datePrecision = (y:string) => y.startsWith("c.") ? "Approximate date" : "Year";
