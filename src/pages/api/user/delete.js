




export async function DELETE(){
    try {
      await sql`DELETE FROM users WHERE id = ${userId}`;
      return NextResponse.json(null, { status: 204 });
    } catch (error) {
      console.error('Error deleting user by ID', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }