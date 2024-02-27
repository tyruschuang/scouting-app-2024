package me.tyrus.generator

object Main {
    @JvmStatic
    fun main(args: Array<String>) {
        val scoutersFile = javaClass.getResource("/scouters.txt").readText()
        val scouters = scoutersFile.split("\n")

        val api = Api()
        val matches = api.getMatches()
    }
}