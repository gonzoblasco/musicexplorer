// __tests__/lib/api/theAudioDB.test.ts
import { searchArtist, getArtistById } from "../../../lib/api/theAudioDB";

// Mock global fetch
global.fetch = jest.fn();

describe("TheAudioDB API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("searchArtist", () => {
    it("returns artist data when API call is successful", async () => {
      const mockArtistData = {
        artists: [
          { idArtist: "123", strArtist: "Coldplay" },
          { idArtist: "456", strArtist: "Coldcut" },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockArtistData,
      });

      const result = await searchArtist("cold");

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("search.php?s=cold"),
      );
      expect(result).toEqual(mockArtistData.artists);
    });

    it("throws error when API call fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(searchArtist("nonexistent")).rejects.toThrow(
        "Error en la búsqueda",
      );
    });

    it("returns empty array when query is empty", async () => {
      const result = await searchArtist("");
      expect(result).toEqual([]);
      // No debería llamar a fetch con una búsqueda vacía
      expect(fetch).not.toHaveBeenCalled();
    });

    it("returns empty array when API response has no artists", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ artists: null }),
      });

      const result = await searchArtist("nonexistent");

      expect(result).toEqual([]);
    });
  });

  describe("getArtistById", () => {
    it("returns artist when API call is successful", async () => {
      const mockArtist = { idArtist: "123", strArtist: "Coldplay" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ artists: [mockArtist] }),
      });

      const result = await getArtistById("123");

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("artist.php?i=123"),
      );
      expect(result).toEqual(mockArtist);
    });

    it("throws error when API call fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getArtistById("nonexistent")).rejects.toThrow(
        "Error obteniendo datos del artista",
      );
    });

    it("throws error when ID is empty", async () => {
      await expect(getArtistById("")).rejects.toThrow(
        "Se requiere ID de artista",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("returns null when API response has no artists", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ artists: null }),
      });

      const result = await getArtistById("nonexistent");
      expect(result).toBeNull();
    });
  });

  // Test adicionales para otras funciones de API...
});
