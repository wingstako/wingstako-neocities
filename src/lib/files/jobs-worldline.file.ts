import type { IFile } from "$lib/types/directory.interface";

export class WorldlineFile implements IFile {
    content: string = `
    Date: 2023-04-01 <br>
    Title: Software Engineer <br>
    Company: Worldline <br>
    Location: Kowloon Bay, HK <br>
    Range: 06/2021 - 02/2022 <br>
    URL: <a href="https://www.worldline.com/" target="_blank">https://www.worldline.com/</a> <br>

    - Implemented scalable payment system that supports 1,000,000 transactions per second, acting as backbone in top-tier financial institutions in the APAC region using Java, Spring Boot, Angular, and MSSQL. <br>
    - Optimized system performance by introducing Kafka with Schema Registry, achieving 40% to 60% reduction in payload size and significantly higher transaction throughput. <br>
    - Automated and optimized testing process, including unit tests, integration tests, and e2e tests using Cypress testing framework. <br>
    - Conducted in-depth analysis of customer requirements, leveraging technical expertise to propose customized solutions that aligned with their unique needs and goals.
    `;
}