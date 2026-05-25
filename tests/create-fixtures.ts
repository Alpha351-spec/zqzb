import * as fs from 'fs';
import * as path from 'path';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

if (!fs.existsSync(FIXTURES)) fs.mkdirSync(FIXTURES, { recursive: true });

const VALID_JPEG_BASE64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiY3OEk6MzM1FicnSTk6OzwcDSlqS0xNTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vHy8/T19vf4+fr/2gAMAwEAAhEDEQA/AP8A/9k=';

const VALID_PDF = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>
endobj
3 0 obj
<< /Type /Page /MediaBox [0 0 612 792] /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Page /MediaBox [0 0 612 792] /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 7 0 R >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length 44 >>
stream
BT /F1 24 Tf 100 700 Td (Page 1) Tj ET
endstream
endobj
7 0 obj
<< /Length 44 >>
stream
BT /F1 24 Tf 100 700 Td (Page 2) Tj ET
endstream
endobj
xref
0 8
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000417 00000 n 
0000000498 00000 n 
0000000593 00000 n 
trailer
<< /Size 8 /Root 1 0 R >>
startxref
688
%%EOF`;

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
