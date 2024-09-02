import { Platform } from "react-native";

export function HtmlEtiqueta(i) {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

    <style>
        *{
            font-family: arial;
        }

        div.etiqueta{
            width: 300px;
            height: 300px;
            background: #000;
            color: #fff;
            border-radius: 5px;
            align-items: center;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 5px;
            font-weight: bold;
            font-size: 30px;
        }

        div.title{
            margin-bottom: 25px;
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
        //window.print();
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
