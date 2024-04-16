function wait(ms) {
    return new Promise(resolve => {
        throw new Error()
      setTimeout(resolve, ms);
    });
  }
  

export default async function Home() {
    await wait(1000 * 5)

    return <section>
        Homepage
    </section>
}