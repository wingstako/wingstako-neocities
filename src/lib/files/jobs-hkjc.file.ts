import type { IFile } from "$lib/types/directory.interface";

export class HKJCFile implements IFile {
    content: string = `
    <pre>                                                                                

title: Trainee
company: Hong Kong Jockey Club
location: Hong Kong
range: 06/2019 - 06/2020
url: <a href="https://www.hkjc.com/home/english/index.aspx" target="_blank">https://www.hkjc.com/home/english/index.aspx</a>

- Leveraged expertise in Spring Boot to contribute to development of cutting-edge Wagering System 
  for monitoring sports competitions in real-time, ensuring accurate and up-to-date information for 
  users using Java, Spring Boot.
- Achieved 90%+ code coverage with unit testing using JUnit and Mockito, ensuring high software quality 
  and reducing risk of bugs and errors in production.
- Developed clear and concise testing documentation to guide developers and ensure consistency across teams.
- Collaborated closely with team members to identify and resolve complex technical issues, improving system 
  performance and reliability.
    </pre>
    `;
}