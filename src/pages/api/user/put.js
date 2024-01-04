


export async function PUT(){
    const { name: putName, email: putEmail, password: putPassword } = req.body;
    try {
      const result = await sql`UPDATE users SET name = ${putName}, email = ${putEmail}, password = ${putPassword} WHERE id = ${userId} RETURNING *`;
      const updatedUser = result.rows[0];
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error('Error updating user by ID', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }    
       