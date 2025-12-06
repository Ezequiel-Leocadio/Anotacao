import { Platform } from "react-native";

export function HtmlLivro(i) {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

    <style>
        *{
            font-family: arial;
        }

        div.capa{
            width: 100%;
            height: 100%;
            align-items: center;
            display: flex;
            justify-content: center;
            font-size: 80px;
            font-weight: bold;
        }
        h1{           
            color: #fff;
            background: #000;
            text-align: center;
        }

         h1.nv2{    
            background: none;
            color: #000;
            text-align: start;
            border-bottom: 1px solid;
        }

        div.itens{
            margin-bottom: 10px;
            border-bottom: 1px dotted;
            
        }
        div.title{
            font-size: 20px;
            font-weight: bold;
           
        }

        div.title{
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        img{
            width: auto;
            max-width: 200px;
            margin: 5px auto;
            display: flex;
        }


        @media print {
          page {
            margin:10mm 0;
          }

          body {
            -webkit-print-color-adjust: exact;
          }

          div.novap {
            margin: 0;
            /* width: 100%; */
            page-break-after: always; /* Cada pelemento será impresso em uma nova página. */
            page-break-inside: avoid;
            box-shadow: 0;
          }

          }

    </style>
  </head>
  <body >
    ${i}
  </body>

  ${
    Platform.OS === "web"
      ? `
    <script type="text/javascript">
    window.onload = function() {    
        window.print();
        setTimeout(function() {
            //window.close();
        }, 1);

            
        
    }
      
</script>
  
  `
      : ""
  }


</html>
`;
}
