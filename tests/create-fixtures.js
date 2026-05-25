const fs = require('fs');
const path = require('path');

const FIXTURES = path.join(__dirname, '..', 'fixtures');
if (!fs.existsSync(FIXTURES)) fs.mkdirSync(FIXTURES, { recursive: true });

const VALID_JPEG_BASE64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM DQ4SEA0OEQ4LCxAWEBETFBUVFQ4PFx8WFBgSFBUU/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQU FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEB AXAREBAA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAA AF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3 ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKW mp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBh JBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiY3OEk6MzM1FicnSTk6 OzwcDSlqS0xNTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYF NQEAAhEDITESBEFRYXETIjKBCRQkaGxwQijM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDR EVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipq rKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vHy8/T19vf4+fr/2gAMAwEAAhED EQA/AP8A/9k=';

const VALID_PDF = '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n3 0 obj\n<< /Type /Page /MediaBox [0 0 612 792] /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 6 0 R >>\nendobj\n4 0 obj\n<< /Type /Page /MediaBox [0 0 612 792] /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 7 0 R >>\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n6 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 100 700 Td (Page 1) Tj ET\nendstream\nendobj\n7 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 100 700 Td (Page 2) Tj ET\nendstream\nendobj\nxref\n0 8\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000266 00000 n \n0000000417 00000 n \n0000000498 00000 n \n0000000593 00000 n \ntrailer\n<< /Size 8 /Root 1 0 R >>\nstartxref\n688\n%%EOF';

const testJpg = path.join(FIXTURES, 'test.jpg');
if (!fs.existsSync(testJpg)) {
  fs.writeFileSync(testJpg, Buffer.from(VALID_JPEG_BASE64, 'base64'));
  console.log('Created: test.jpg');
}

const personJpg = path.join(FIXTURES, 'person.jpg');
if (!fs.existsSync(personJpg)) {
  fs.copyFileSync(testJpg, personJpg);
  console.log('Created: person.jpg');
}

const aPdf = path.join(FIXTURES, 'a.pdf');
if (!fs.existsSync(aPdf)) {
  fs.writeFileSync(aPdf, VALID_PDF, 'utf-8');
  console.log('Created: a.pdf');
}

const bPdf = path.join(FIXTURES, 'b.pdf');
if (!fs.existsSync(bPdf)) {
  fs.copyFileSync(aPdf, bPdf);
  console.log('Created: b.pdf');
}

const testTxt = path.join(FIXTURES, 'test.txt');
if (!fs.existsSync(testTxt)) {
  fs.writeFileSync(testTxt, 'Hello World Test Content', 'utf-8');
  console.log('Created: test.txt');
}

const testJson = path.join(FIXTURES, 'test.json');
if (!fs.existsSync(testJson)) {
  fs.writeFileSync(testJson, '{"name":"test","value":123}', 'utf-8');
  console.log('Created: test.json');
}

console.log('All fixtures created in:', FIXTURES);
