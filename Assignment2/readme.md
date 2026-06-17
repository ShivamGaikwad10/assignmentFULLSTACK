# QR Attendance System

## Overview

This project implements a QR based attendance system.

The user uploads an image containing a QR code. The QR code is decoded, the roll number is extracted, and attendance is marked automatically.
Since Telegram was not available, a simple web interface is used instead.
---

## Files

### qr.js

Responsible for decoding QR codes from images.

Input:
* Image path

Output:
* Raw QR string

### parser.js

Responsible for extracting the roll number from the decoded QR string.

Functions:
* extractRollNumber()
* isRegistered()

### attendance.js

Responsible for storing attendance records.

Functions:
* markPresent()
* getStats()

Attendance data is stored in attendance.json

### server.js

Provides a simple web interface for uploading QR images and viewing attendance reports.

---

## Installation

Install all required packages:

```bash
npm install
```
---

## Running the Project

Start the server:

```bash
npm start
```
Open the following URL in a browser:
```text
http://localhost:3000
```

---


To view attendance statistics:
```text
http://localhost:3000/report
```
---

## Author
Shivam Gaikwad
Roll NO :- 240391
