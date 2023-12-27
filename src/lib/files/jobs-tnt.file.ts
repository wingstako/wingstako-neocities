import type { IFile } from "$lib/types/directory.interface";

export class TnTSupermarketFile implements IFile {
    content: string = `
    <pre>                                                                                                                                                        
*+++++++++++++++++++++++        *++++++++        ++++++++++++++++++++++++   
+++++   *+++++++   *++++*     ++++    +++++      +++++    +++++++   *++++*  
+++     *+++++++     *+++    +++++     +++++     +++      +++++++     +++*  
++      *+++++++      *++    ++++++*   ++++*     ++       +++++++      *++  
+       *+++++++       *     +++++++++++++       +        +++++++       *+  
        *+++++++              +++++++++  *+++++++++       +++++++           
        *+++++++          *+++* ++++++++     ++*          +++++++           
        *+++++++        +++++    *+++++++*  *++           +++++++           
        *+++++++       ++++++      +++++++++++            +++++++           
        *+++++++       +++++++      ++++++++*             +++++++           
        *+++++++       +++++++++      ++++++++            +++++++           
        *+++++++        ++++++++++*+++++++++++++          +++++++           
      ************+       **+++++++*     *********+    *************        
                                                                                                                                                                  
title: Application Developer
company: 'T&T Supermarket'
location: Canada
range: 07/2023 - current
url: <a href="https://www.tntsupermarket.com/" target="_blank">https://www.tntsupermarket.com/</a>

- Still working on it
    </pre>
    `;
}