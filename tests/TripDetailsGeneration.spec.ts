/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('Trip details are generated with the form details provided', async ({
  page,
}) => {
  await page.goto('https://ai-trip-planner-frontend.vercel.app/');
  await page.getByRole('combobox', { name: 'Prefectures' }).click();
  await page.getByRole('option', { name: 'Tokyo' }).click();
  await page.getByRole('combobox', { name: 'Prefectures' }).click();
  await page.getByRole('option', { name: 'Osaka' }).click();
  await page.getByRole('textbox', { name: 'Length of Trip (days)' }).click();
  await page.getByRole('textbox', { name: 'Length of Trip (days)' }).fill('4');
  await page.getByLabel('Arrival Airport').selectOption('Haneda Airport (HND)');
  await page
    .getByLabel('Departure Airport')
    .selectOption('Narita International Airport (NRT)');

  // For Time of Arrival
  await page
    .getByTestId('timeOfArrivalField')
    .getByRole('button', { name: 'Choose time' })
    .click();
  await page.getByRole('option', { name: '12 hours' }).nth(0).click();
  await page.getByRole('option', { name: '0 minutes', exact: true }).click();
  await page.getByRole('option', { name: '20 minutes' }).click();
  await page.getByRole('button', { name: 'OK', exact: true }).click();

  // For Time of Departure
  await page
    .getByTestId('timeOfDepartureField')
    .getByRole('button', { name: 'Choose time' })
    .click();
  await page.getByRole('option', { name: '12 hours' }).nth(0).click();
  await page.getByRole('option', { name: '0 minutes', exact: true }).click();
  await page.getByRole('option', { name: 'PM' }).click();
  await page.getByRole('button', { name: 'OK', exact: true }).click();

  await page.getByRole('button', { name: 'Generate Trip' }).click();
  await page.waitForResponse(
    'https://ai-trip-planner-backend-z72w.onrender.com/generate'
  );
  await expect(page.getByRole('textbox', { name: 'Trip Details' })).toHaveValue(
    /Tokyo|Osaka/
  );
});
