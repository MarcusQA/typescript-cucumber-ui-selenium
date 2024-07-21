#!/bin/bash

npm run build
npm test
node test/report/cucumber-report-generator.ts