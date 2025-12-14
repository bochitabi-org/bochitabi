package getmemories

type GetMemoriesResult struct {
	Memories []Memory `json:"memories"`
}

type Memory struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	Story     string   `json:"story"`
	Latitude  string   `json:"latitude"`
	Longitude string   `json:"longitude"`
	Pictures  []string `json:"pictures"`
}
