export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const SHEET_ID = '1R4vLcXshDeMUqDZHO1GUR16AYSSoak1zso0kBdw591w';
  const SHEET_NAME = 'Users';

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
  const response = await fetch(url);
  const text = await response.text();

  const json = JSON.parse(text.substring(47).slice(0, -2));
  const rows = json.table.rows;

  const user = rows.find(r =>
    r.c[0]?.v === email &&
    r.c[1]?.v === password &&
    r.c[3]?.v === 'active'
  );

  if (!user) {
    return res.status(401).json({ 
      error: 'Email or Password is not valid.\nFor changing password or email contact admin@azadai.com.au' 
    });
  }

  const redirectUrl = user.c[2].v;
  res.status(200).json({ redirect: redirectUrl });
}
